import { createApp } from 'vue'
import * as Vue from "vue"
import { SupabaseRepository } from '../model/SupabaseRepository'
import { createRouter, createWebHashHistory, Router } from 'vue-router'
//@ts-ignore
import BoardListView from '../view/BoardListView/BoardListView.vue'
//@ts-ignore
import BoardView from '../view/BoardView/BoardView.vue'
//@ts-ignore
import LoginView from '../view/LoginView/LoginView.vue'
//@ts-ignore
import Main from '../view/Main/Main.vue'
import Board from '../model/Board'
import { IBoardRow } from '../model/schema'
import Scene from './Scene'

import convertor from "../data/items-data"

interface ILoginPageViewTagsID {
  "sign-up": string,
  "login-button": string,
  "logout-button": string,
}

export interface AppState {
  board?: Board,
  list?: IBoardRow[] | Promise<IBoardRow[]>,
  tool: string
}

export class App {
  supabase: SupabaseRepository;
  state: AppState;
  controller: any;
  router: Router;
  scene: Scene;
  vue: Vue.App;
  constructor(SUPABASE_URL: string, SUPABASE_KEY: string) {
    this.supabase = new SupabaseRepository(SUPABASE_URL, SUPABASE_KEY)
    this.state = { tool: "rect" }

    this.controller = {
      setBoard: async (id: number) => {
        window.localStorage.setItem("board_id", String(id))
        this.state.board = await this.supabase.boards.board(id)
      },
      getList: async () => {
        if (!this.state.list) {
          this.state.list = this.supabase.boards.list()
        }
        return this.state.list
      },
      getBoard: () => this.state.board,
      getRouter: () => this.router,
      auth: async (method: "singup" | "login", email: string, password: string) => {
        console.log(method, email, password);
        if (method == 'login') return this.supabase.user.signIn(email, password)
          .then(() => this.supabase.boards.list()
            .then(res => this.state.list = res))
        const res = this.supabase.user.singUp(email, password)
        res.then(() => this.supabase.boards.list()
          .then(res => this.state.list = res))
        alert('Confirmation email sent')
        return res
      },
      createBoard: (title: string) => this.supabase.boards.create(title).then((res) => this.state.board = res),
      mountScene: () => {
        this.scene = new Scene('konva-container', 500, 500);
        this.state.board.loadItems().then((items) => items.forEach((item) => this.scene.addKonvaItem(convertor.convertItem(item))))

        this.state.board.onInsert = (item) => this.scene.addKonvaItem(convertor.convertItem(item.new))
        this.state.board.onUpdate = (item) => this.scene.mutateItem(item.old.id, item.new)
        this.state.board.onDelete = (item) => this.scene.removeItem(item.old.id)

        this.scene.onUpdate = (id, attrs) => this.state.board.mutateItem({ id, attrs, board_id: this.state.board.id })

      },
      getScene: () => this.scene
    }

    if (window.localStorage.getItem("board_id")) this.controller.setBoard(window.localStorage.getItem("board_id"))

    const routes = [
      { path: '/', name: 'list', component: BoardListView, props: this.controller },
      { path: '/board', name: 'board', component: BoardView, props: this.controller },
      { path: '/auth', name: 'auth', component: LoginView, props: this.controller }
    ]

    this.router = createRouter({
      history: createWebHashHistory(),
      routes: routes
    })

    this.vue = createApp(Main,)
    this.vue.use(this.router)
    this.vue.mount('#root')

    if (!this.supabase.user.details) this.router.push('/auth')
    else {
      this.supabase.boards.list().then(res => this.state.list = res)
    }
  }


}
