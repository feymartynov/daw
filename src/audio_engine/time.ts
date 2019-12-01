export const QUANTS_IN_BEAT = 4;

export class Quants {
  value: number

  constructor(value: number) {
    this.value = value;
  }

  toSeconds(tempo: Bpm): Seconds {
    return new Seconds(60.0 / tempo.value / QUANTS_IN_BEAT * this.value);
  }
}

export class Seconds {
  value: number

  constructor(value: number) {
    this.value = value;
  }

  add(other: Seconds): Seconds {
    return new Seconds(this.value + other.value);
  }

  sub(other: Seconds): Seconds {
    return new Seconds(this.value - other.value);
  }

  multiply(other: Seconds): Seconds {
    return new Seconds(this.value * other.value);
  }

  scale(n: number): Seconds {
    return new Seconds(n);
  }

  toMilliseconds(): number {
    return this.value * 1000;
  }

  toQuants(tempo: Bpm): Quants {
    return new Quants(this.value / 60.0 / tempo.value / QUANTS_IN_BEAT);
  }
}

export class Bpm {
  value: number

  constructor(value: number) {
    this.value = value;
  }

  ratio(other: Bpm): number {
    return this.value / other.value;
  }
}
