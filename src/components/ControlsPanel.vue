<template>
  <div class="ControlsPanel">
    <button class="btn-control btn-record" :class="{'btn-active': recording}" @click="onRecordClick">
      <font-awesome-icon icon="circle" />
    </button>

    <button class="btn-control btn-play" :class="{'btn-active': playing}" @click="onPlayClick">
      <font-awesome-icon icon="play" />
    </button>

    <button class="btn-control btn-stop" @click="onStopClick">
      <font-awesome-icon icon="stop" />
    </button>

    <span class="divider"></span>
    <div class="time-indicator">{{ this.formatTime(0) }}</div>
    <span class="divider"></span>

    <button class="btn-control btn-add-track" @click="onAddTrackClick">
      <font-awesome-icon icon="plus" />
    </button>
  </div>
</template>

<script lang="ts">
import { v4 as uuid } from 'uuid';
import { Component, Vue } from 'vue-property-decorator';
import { faCircle, faPlay, faPlus, faStop } from '@fortawesome/free-solid-svg-icons';
import { ArrangementState, Track } from '../store/modules/arrangement';

@Component
export default class ControlsPanel extends Vue {
  recording: boolean = false
  playing: boolean = false

  // TODO
  formatTime(_value: number): string {
    return '0'
  }

  onRecordClick(): void {
    if (this.recording) {
      this.recording = false;
    } else if (this.playing) {
      this.recording = true;
    } else {
      this.recording = true;
      this.playing = true;
    }
  }

  onPlayClick(): void {
    if (!this.playing) this.playing = true;
  }

  onStopClick(): void {
    this.recording = false;
    this.playing = false;
  }

  onAddTrackClick(): void {
    let trackNumber = this.$store.getters.tracks.length + 1;
    let track = { id: uuid(), name: `Track ${trackNumber}` };
    this.$store.dispatch('addTrack', track);
  }
}
</script>

<style>
.ControlsPanel {
  background-color: #333;
  border-bottom: 1px solid #222;
  padding: 5px;
}

.ControlsPanel .btn-control {
  background-color: #444;
  border: 1px solid #222;
  border-radius: 3px;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 20px;
  height: 50px;
  margin-right: 5px;
  width: 50px;
}

.ControlsPanel .btn-control:active {
  background-color: #666;
}

.ControlsPanel .btn-control.btn-active {
  background-color: #666;
}

.ControlsPanel .btn-record {
  color: #f00;
}

.ControlsPanel .btn-record.btn-active {
  background-color: #f00;
  color: #fff;
}

.ControlsPanel .time-indicator {
  background-color: #69a;
  border: solid 1px #135;
  color: #135;
  display: inline-block;
  font-size: 2em;
  height: 41px;
  margin-right: 5px;
  padding: 5px 5px 0 5px;
  position: relative;
  top: 2px;
  vertical-align: top;
}

.ControlsPanel .divider {
  border: 1px solid #222;
  display: inline-block;
  height: 35px;
  margin-right: 5px;
  margin-top: 7px;
  vertical-align: top;
  width: 0;
}
</style>
