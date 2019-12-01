export default class Sample {
  audioContext: AudioContext;
  buffer?: AudioBuffer;

  constructor(audioContext: AudioContext) {
    this.audioContext = audioContext;
  }

  async load(url: string): Promise<void> {
    let response = await fetch(url);
    if (!response.ok) throw new Error(`Expected status 200, got ${response.status}`);
    let buffer = await this.audioContext.decodeAudioData(await response.arrayBuffer());
    if (!buffer) throw new Error(`Error decoding file data: ${url}`);
    this.buffer = buffer;
  }

  getBuffer(): AudioBuffer {
    if (this.buffer) {
      return this.buffer;
    } else {
      throw('Sample not loaded');
    }
  }
}
