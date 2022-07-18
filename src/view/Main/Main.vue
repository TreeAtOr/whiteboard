<template>
  <div id="app">
    <router-view
    ></router-view>
  </div>
</template>

<script>
import BoardCreateView from "../BoardCreateView/BoardCreateView.vue";
import BoardView from "../BoardView/BoardView.vue";
import BoardListView from "../BoardListView/BoardListView.vue";
import LoginView from "../LoginView/LoginView.vue";

import { SUPABASE_URL, SUPABASE_KEY } from "../../data/const";

export default {
  props: {
    setBoardId: Function,
    getList: Function,
    getBoard: Function,
    getRouter: Function,
    auth: Function,
  },
  components: { BoardView, BoardListView, BoardCreateView, LoginView },
};
</script>

<style>
</style>