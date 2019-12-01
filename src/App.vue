<template>
  <div class="App">
    <div class="tracks-wrapper">
      <div class="tracks-panel">
        <TracksPanel />
      </div>

      <div class="arrangement">
        <Arrangement />
      </div>
    </div>

    <div class="controls-panel">
      <ControlsPanel />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Arrangement from './components/Arrangement.vue';
import ControlsPanel from './components/ControlsPanel.vue';
import TracksPanel from './components/TracksPanel.vue';

@Component({
  components: {
    Arrangement,
    ControlsPanel,
    TracksPanel,
  },
})
export default class App extends Vue {}
</script>

<style>
* {
  margin: 0;
  padding: 0;
}

html, body {
  font-family: Helvetica;
  height: 100%;
}

#root {
  height: 100%;
}

.App {
  display: flex;
  flex-direction: column;
  height: 100%;
}

.App .controls-panel {
  position: fixed;
  width: 100%;
}

.App .tracks-wrapper {
  display: flex;
  flex: 1;
  padding-top: 60px;
}

.App .tracks-panel {
  flex: 0 0 200px;
}

.App .arrangement {
  flex: 1;
}

.App .bottom {
  flex-grow: 1;
  overflow: auto;
}
</style>
