import { SupabaseRepository } from '../model/SupabaseRepository'
import IView from '../utils/IView'
import { BoardListView } from '../view/BoardListView/BoardListView'

interface ILoginPageViewTagsID {
  "sign-up": string,
  "login-button": string,
  "logout-button": string,
}


export class LoginPageView implements IView {
  constructor() {

  }

  render() {
    return ''
  }

  public async activate(signUpSubmitted: any, logInSubmitted: any, logoutSubmitted: any) {
    const signUpForm = document.querySelector('#sign-up') as HTMLFormElement
    signUpForm.onsubmit = signUpSubmitted

    const logInForm = document.querySelector('#log-in') as HTMLFormElement
    logInForm.onsubmit = logInSubmitted

    const logoutButton = document.querySelector('#logout-button') as HTMLButtonElement
    logoutButton.onclick = logoutSubmitted

  }
}

export interface AppState {
  activeView: "board" | "board-list" | "login"
  board_id?: string,
  tool: string
}

export class App {
  supabase: SupabaseRepository;
  state: AppState;
  constructor(SUPABASE_URL: string, SUPABASE_KEY: string) {
    this.supabase = new SupabaseRepository(SUPABASE_URL, SUPABASE_KEY)
    this.state = { activeView: "board-list", tool: "rect" }

    this.supabase.boards.list().then(list => {
      const listView = new BoardListView(list)
      listView.onMove = (id: string) => {

      }
      listView.onCreate = () => {
        this.supabase.boards.create(prompt("board name", "New board"))
      }
      listView.onDelete = (id: string) => {
        alert("Board deletion is not implemented")
      }
      this.mount(listView).then(()=> listView.activate())
    })
  }

  private async mount(view: IView) {
    document.querySelector('body').innerHTML = view.render()
  }
}
