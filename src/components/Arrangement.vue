<template>
  <div class="Arrangement">
    <ul className="tracks">
      <li v-for="track in tracks" :key="track.getId()" @click="switchActiveTrack">
        <Track :track="track" :active="track.getId() === this.activeTrackId" />
      </li>
    </ul>

    <div className="cursor">
      <div className="hat"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Clip from './Arrangement/Clip.vue';
import Track from './Arrangement/Track.vue';

@Component({
  components: {
    Clip,
    Track,
  },
  props: {
    tracks: Array,
    activeTrackId: Boolean,
  }
})
export default class Arrangement extends Vue {
  // TODO
  switchActiveTrack() {
  }
}
</script>

<style>
.Arrangement {
  background-image: linear-gradient(to right, #999, #999 1px, transparent 0);
  background-size: 50px 100%;
  background-color: #ccc;
  height: 100%;
  position: relative;
}

.Arrangement .tracks {
  list-style: none;
}

.Arrangement .cursor {
  border-left: 1px solid #222;
  height: 100%;
  position: absolute;
  top: 0;
  width: 0px;
}

.Arrangement .cursor>.hat {
  border-left: 10px solid transparent;
  border-right: 10px solid transparent;
  border-top: 10px solid #222;
  height: 0;
  left: -10px;
  position: relative;
  top: -1px;
  width: 0;
}
</style>
