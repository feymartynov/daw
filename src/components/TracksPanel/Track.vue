<template>
  <div class="Track" :class="{active}">
    <div className="name">{{ name }}</div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    name: String,
    active: Boolean,
  }
})
export default class Track extends Vue {}
</script>

<style>
.TracksPanel {
  max-width: 200px;
}

.TracksPanel .Track {
  border-bottom: 1px solid #444;
  color: #fff;
  height: 75px;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.TracksPanel .Track.active {
  background-color: #444;
}

.TracksPanel .Track .name {
  left: 5px;
  position: relative;
  top: 5px;
  white-space: nowrap;
}
</style>
