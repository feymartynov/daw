import { Seconds, Bpm, Quants } from './time';
import Clip from './clip';
import { Track } from './track';

class ScheduledClipsRegistry {
  counter: number = 0;
  clips: Map<number, Clip> = new Map<number, Clip>();

  add(clip: Clip): void {
    let counter = this.counter++;
    this.clips.set(counter, clip);
    clip.onEnded(() => this.clips.delete(counter));
  }

  clear(callback: (clip: Clip) => void): void {
    for (let clip of this.clips.values()) callback(clip);
    this.clips.clear();
  }
}

export default class Sequencer extends EventTarget {
  audioContext: AudioContext;
  tracks: Array<Track> = [];
  audioUnlocked: boolean = false;
  clockWorker: Worker;
  scheduledClipsRegistry: ScheduledClipsRegistry = new ScheduledClipsRegistry;
  tempo: Bpm = new Bpm(1);
  quant: Seconds = new Seconds(1);
  playing: boolean = false;
  nextQuantTime?: Seconds;
  playingStoppedAt: Seconds = new Seconds(0);
  position: Seconds = new Seconds(0);

  constructor(audioContext: AudioContext) {
    super();
    this.audioContext = audioContext;

    this.clockWorker = new Worker('clock.js');
    this.clockWorker.onmessage = evt => evt.data === 'tick' && this._onTick();
    this.setTempo(new Bpm(120.0));
  }

  addTrack(track: Track) {
    this.tracks.push(track);
    this._restart();
  }

  isPlaying(): boolean {
    return this.playing;
  }

  getTempo(): Bpm {
    return this.tempo;
  }

  setTempo(value: Bpm): void {
    this.position = this.position.scale(this.tempo.ratio(value));
    this.tempo = value;
    this.quant = new Quants(1).toSeconds(value);
    this.clockWorker.postMessage({ command: 'setInterval', value: this.quant.toMilliseconds() });
    this._restart();
  }

  setPosition(value: Seconds): void {
    this.position = value.multiply(this.quant);
    this._restart();
  }
  
  _restart(): void {
    if (!this.playing) return;
    this.stop();
    this.play();
  }

  play(): void {
    if (this.playing) return;
    if (!this.audioUnlocked) this._unlockAudio();

    // Schedule a little bit into future to prevent unsync.
    let playingStart = new Seconds(this.audioContext.currentTime).add(this.quant);
    let translationDelta = playingStart.sub(this.position);

    for (let track of this.tracks) {
      for (let { clip, start, length } of track.getTimeline()) {
        let absStart = start.toSeconds(this.tempo).add(translationDelta);
        let offset = playingStart.sub(absStart);
        let secondsLength = length.toSeconds(this.tempo);
        let scheduled = true;
        
        if (absStart >= playingStart) {
          // Clip is in the future. Schedule it from the beginning.
          clip.playAt(absStart, new Seconds(0), secondsLength, this.tempo);
        } else if (offset < secondsLength) {
          // Clip is in the middle. Start with the offset.
          clip.playAt(playingStart, offset, secondsLength.sub(offset), this.tempo);
        } else {
          // Clip is in the past. Ignore it.
          scheduled = false;
        }

        if (scheduled) this.scheduledClipsRegistry.add(clip);
      }
    }

    // Check whether scheduling took to long to warn about possible unsync.
    let delta = new Seconds(this.audioContext.currentTime).sub(playingStart);

    if (delta.value > 0) {
      console.error(`Unsync detected. Scheduling didn't finished in time. Delta is ${delta}`);
    } else if (delta.value > -0.1) {
      console.warn(`About to unsync. Delta is ${delta}`);
    }

    this.nextQuantTime = playingStart;
    this.playing = true;
    this.clockWorker.postMessage({ command: 'start' });
  }

  stop(): void {
    if (!this.playing) return;

    // Schedule stopping clips a little bit into future to prevent unsync.
    let stopTime = new Seconds(this.audioContext.currentTime).add(this.quant);
    this.scheduledClipsRegistry.clear(clip => clip.stopAt(stopTime));
  
    this.playing = false;
    this.clockWorker.postMessage({ command: 'stop' });
  }

  _unlockAudio(): void {
    // Play silent buffer for the first time to unlock the audio.
    // This prevents freezing when nothing is scheduled right in the beginning.
    let buffer = this.audioContext.createBuffer(1, 1, 44100);
    let node = this.audioContext.createBufferSource();
    node.buffer = buffer;
    node.start(0);
    this.audioUnlocked = true;
  }

  _onTick(): void {
    if (!this.playing || !this.nextQuantTime) return;
    if (this.audioContext.currentTime <= this.nextQuantTime.value) return;

    this.nextQuantTime = this.nextQuantTime.add(this.quant);
    this.position = this.position.add(this.quant);

    let event = new CustomEvent('tick', { detail: { time: this.position.toQuants(this.tempo) } });
    setTimeout(() => this.dispatchEvent(event), 0);
  }
}
