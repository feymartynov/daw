<template>
  <div class="ControlsPanel">
    <button class="btn-control btn-record" :class="{'btn-active': false}" @click="onRecordClick">
      <font-awesome-icon icon="circle" />
    </button>

    <button class="btn-control btn-play" :class="{'btn-active': false}" @click="onPlayClick">
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
import { Component, Vue } from 'vue-property-decorator';
import { faCircle, faPlay, faPlus, faStop } from '@fortawesome/free-solid-svg-icons';

@Component
export default class ControlsPanel extends Vue {
  // TODO
  formatTime(_value: number) {
    return '0'
  }

  // TODO
  onRecordClick() {
  }

  // TODO
  onPlayClick() {
  }

  // TODO
  onStopClick() {
  }

  // TODO
  onAddTrackClick() {
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
