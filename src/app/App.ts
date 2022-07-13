import { SupabaseRepository } from '../model/SupabaseRepository'
import IView from '../utils/IView'

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
  board_id?: string
}

export class App {
  supabase: SupabaseRepository;
  state: AppState;
  constructor(SUPABASE_URL: string, SUPABASE_KEY: string) {
    this.supabase = new SupabaseRepository(SUPABASE_URL, SUPABASE_KEY)

    this.state = {}
  }
  public init() {



  }
  signUpSubmitted(ev: any): any {
    ev.preventDefault()
    const email = ev.target[0].value
    const password = ev.target[1].value

    this.supabase.user.singUp(email, password)
  }

  logInSubmitted(ev: any): any {
    ev.preventDefault()
    const email = ev.target[0].value
    const password = ev.target[1].value

    this.supabase.user.signIn(email, password)
  }

  logoutSubmitted(ev: any): any {
    this.supabase.user.signOut()
  }
}
