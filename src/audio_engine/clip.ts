import { Seconds, Bpm } from './time';
import Sample from './sample';

export default class Clip {
  audioContext: AudioContext;
  id: string;
  buffer: AudioBuffer;
  tempo: Bpm;
  source?: AudioBufferSourceNode;
  playing: Boolean = false;

  constructor(audioContext: AudioContext, id: string, sample: Sample, tempo: Bpm) {
    this.audioContext = audioContext;
    this.id = id;
    this.buffer = sample.getBuffer();
    this.tempo = tempo;
  }

  getDuration(): number | undefined {
    if (this.source && this.source.buffer) return this.source.buffer.duration;
  }

  playAt(time: Seconds, offset: Seconds, duration: Seconds, tempo: Bpm): void {
    this.source = this.audioContext.createBufferSource();
    this.source.buffer = this.buffer;
    this.source.playbackRate.value = tempo.ratio(this.tempo);
    this.source.connect(this.audioContext.destination);
    this.source.start(time.value, offset.value, duration.value);
  }

  stopAt(time: Seconds): void {
    if (this.source) this.source.stop(time.value);
  }

  onEnded(callback: () => void): void {
    if (this.source) {
      this.source.onended = callback;
    } else {
      throw new Error('Source not set');
    }
  }
}
