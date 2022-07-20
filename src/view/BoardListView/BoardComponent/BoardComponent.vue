<template>
  <div>
    <p>
      <button class="boarder_title">
        <h1>{{ title }}</h1>
      </button>
      <button @click="_onMove" id="move">
        <img src="кнопка перехода.png" style="vertical-align: middle" />
      </button>
      <button @click="_onDelete" id="delete">
        <img src="кнопка удалить.png" style="vertical-align: middle" />
      </button>
    </p>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    id: Number,
    onMove: Function,
    onDelete: Function,
  },
  methods: {
    _onMove() {
      this.$props.onMove(this.$props.id);
    },
    _onDelete() {
      this.$props.onDelete(this.$props.id);
    },
  },
};
</script>

<style>
</style>