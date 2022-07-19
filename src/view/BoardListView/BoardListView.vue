<template>
  <div id="wrapper">
    <header-component :title="'Control panel'" />

    <div id="sidebar">
      <div id="zatemnenie">
        <div id="okno">
          <p>
            <button><img class="right_poisk" src="поиск.png" /></button>
          </p>
        </div>
      </div>
      <p>
        <button @click="onCreate">
          <img class="right_new" src="новая доска.png" />
        </button>
      </p>
    </div>

    <div id="content">
      <board-component
        v-for="item in listItems"
        :key="item.id"
        :id="item.id"
        :title="item.title"
        :onDelete="onDelete"
        :onMove="onMove"
      />
    </div>
  </div>
</template>

<script>
import HeaderComponent from "../Header/HeaderComponent.vue";
import BoardComponent from "./BoardComponent/BoardComponent.vue";
export default {
  data() {
    return {
      list: this.getList(),
    };
  },
  props: {
    getList: Function,
    setBoard: Function,
    createBoard: Function,
    getRouter: Function,
  },
  components: {
    BoardComponent,
    HeaderComponent,
  },
  computed: {
    listItems() {
      if (this.list instanceof Promise)
        this.list.then((res) => (this.list = res));
      return this.list;
    },
  },
  methods: {
    async onMove(id) {
      await this.$props.setBoard(id);
      this.$props.getRouter().push("board");
    },
    onDelete(id) {
      alert("this feature not implemented yet");
    },
    onCreate() {
      const title = prompt(
        "Enter board title (need to be replaced with BoardCreateView)",
        "New board"
      );
      this.$props
        .createBoard(title)
        .than(() => this.$props.getRouter().push("board"));
    },
  },
};
</script>

<style>
</style>