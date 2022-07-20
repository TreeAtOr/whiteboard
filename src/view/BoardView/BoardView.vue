<template>
  <div id="wrapper">
    <header-component :title="'Whiteboard'" />
    {{ $route.params.id }}
    <section class="intro">
      <div class="field">
        <div id="konva-container" ref="konva"></div>
        <div class="tools">
          <button @click="onImage" id="image-tool">
            <img alt="" src="foto.png" />
          </button>
          <button @click="onRect" id="rect-tool">
            <img alt="" src="rectangle.png" />
          </button>
          <button @click="onLine" id="line-tool">
            <img alt="" src="Vector.png" />
          </button>
          <button @click="onText" id="text-tool">
            <img alt="" src="text.png" />
          </button>
          <button id="plus-tool"><img alt="" src="plus.png" /></button>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import HeaderComponent from "../Header/HeaderComponent.vue";
export default {
  components: { HeaderComponent },
  props: {
    getBoard: Function,
    getRouter: Function,
    mountScene: Function,
    getScene: Function,
  },

  methods: {
    onRect() {
      this.getBoard().addItem({
        id: crypto.randomUUID(),
        type: "rect",
        attrs: {
          x: 90,
          y: 90,
          width: 40,
          height: 40,
        },
        board_id: this.getBoard().id,
      });
    },
    onLine() {
      this.getBoard().addItem({
        id: crypto.randomUUID(),
        type: "line",
        attrs: {
          points: [10, 20, 50, 20],
        },
        board_id: this.getBoard().id,
      });
    },
    onImage() {
      this.getBoard().addItem({
        id: crypto.randomUUID(),
        type: "image",
        attrs: {
          url: prompt("enter image url"), //"https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/SIPI_Jelly_Beans_4.1.07.tiff/lossy-page1-256px-SIPI_Jelly_Beans_4.1.07.tiff.jpg"
          x: 10,
          y: 10,
          height: 108,
          width: 192,
        },
        board_id: this.getBoard().id,
      });
    },
    onText() {
      this.getBoard().addItem({
        id: crypto.randomUUID(),
        type: "text",
        attrs: {
          text: "Edit me...",
          x: 90,
          y: 90,
          width: 80,
          height: 20,
          strokeWidth: 0,
        },
        board_id: this.getBoard().id,
      });
    },
  },

  onPlus() {
    this.getBoard().addMember(prompt("write user id"));
  },

  mounted() {
    this.mountScene();
  },
};
</script>

<style>
</style>