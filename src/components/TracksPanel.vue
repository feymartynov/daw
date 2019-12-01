<template>
  <div class="TracksPanel">
    <ul class="tracks">
      <li v-for="item in tracks" :key="item.track.id" @click="switchActiveTrack(item.track)">
        <Track v-bind="item.track" :active="item.active" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Track from './TracksPanel/Track.vue';
import { TrackListItem } from '../store/modules/arrangement';

@Component({
  components: {
    Track,
  }
})
export default class TracksPanel extends Vue {
  get tracks(): Array<TrackListItem> {
    return this.$store.getters.tracks;
  }

  switchActiveTrack(track: Track): void {
    this.$store.dispatch('switchActiveTrack', track);
  }
}
</script>

<style>
.TracksPanel {
  background-color: #333;
  height: 100%;
  width: 100%;
}

.TracksPanel .tracks {
  list-style: none;
}
</style>
