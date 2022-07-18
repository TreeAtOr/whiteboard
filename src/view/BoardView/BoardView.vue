<template>
  <header-component :title="Whiteboard" />
  {{ $route.params.id }}
  <section class="intro">
    <div class="field">
      <div id="konva-container" ref="konva"></div>
      <div class="tools">
        <button id="image-tool"><img alt="" src="foto.png" /></button>
        <button id="rect-tool"><img alt="" src="rectangle.png" /></button>
        <button id="line-tool"><img alt="" src="Vector.png" /></button>
        <button id="text-tool"><img alt="" src="text.png" /></button>
        <button id="plus-tool"><img alt="" src="plus.png" /></button>
      </div>
    </div>
  </section>
</template>

<script>
import HeaderComponent from "../Header/HeaderComponent.vue";
export default {
  components: { HeaderComponent },
  props: {
    getBoard: Function,
    getRouter: Function,
    mountScene: Function,
  },

  mounted() {
    this.mountScene();
  },
};
</script>

<style>
</style>