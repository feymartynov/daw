import { Quants } from './time';
import Clip from './clip';

export class TimelineItem {
  clip: Clip;
  start: Quants;
  length: Quants;

  constructor(clip: Clip, start: Quants, length: Quants) {
    this.clip = clip;
    this.start = start;
    this.length = length;
  }
}

export class Track {
  timeline: Array<TimelineItem> = [];
  
  addClip(clip: Clip, start: Quants, length: Quants) {
    this.timeline.push(new TimelineItem(clip, start, length));
  }

  getTimeline(): Array<TimelineItem> {
    return this.timeline;
  }
}
