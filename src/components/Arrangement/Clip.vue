<template>
  <div class="Clip"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  props: {
    id: String,
  }
})
export default class Clip extends Vue {}
</script>
