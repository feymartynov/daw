<template>
  <div class="Track" :class="{active}">
    <ul className="clips">
      <li v-for="clip in clips" :key="clip.getId()">
        <Clip :clip="clip" />
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    active: Boolean,
    clips: Array, // TODO: move to state
  }
})
export default class Track extends Vue {}
</script>

<style>
.Arrangement .Track {
  background-image: linear-gradient(to right, #999, #999 1px, transparent 0);
  background-size: 50px 100%;
  border-bottom: 1px solid #999;
  height: 75px;
  width: 100%;
}

.Arrangement .Track.active {
  background-color: #ddd;
}
</style>
