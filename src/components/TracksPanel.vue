<template>
  <div class="TracksPanel">
    <ul className="tracks">
      <li v-for="track in tracks" :key="track.getId()" @click="switchActiveTrack">
        <Track :track="track" :active="track.getId() === this.activeTrackId" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Track from './TracksPanel/Track.vue'

@Component({
  components: {
    Track,
  },
  props: {
    tracks: Array,
    activeTrackId: Boolean,
  }
})
export default class TracksPanel extends Vue {
  // TODO
  switchActiveTrack() {
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
