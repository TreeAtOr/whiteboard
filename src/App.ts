import { SupabaseRepository } from './supabase/SupabaseRepository'


export class App {
    supabase: SupabaseRepository;
    constructor(SUPABASE_URL: string, SUPABASE_KEY: string) {
      this.supabase = new SupabaseRepository(SUPABASE_URL, SUPABASE_KEY)
  
      const signUpForm = document.querySelector('#sign-up') as HTMLFormElement
      signUpForm.onsubmit = this.signUpSubmitted.bind(this)
  
      const logInForm = document.querySelector('#log-in') as HTMLFormElement
      logInForm.onsubmit = this.logInSubmitted.bind(this)
  
  
      const logoutButton = document.querySelector('#logout-button') as HTMLButtonElement
      logoutButton.onclick = this.logoutSubmitted.bind(this)
  
    }
    signUpSubmitted(ev: any): any {
      ev.preventDefault()
      const email = ev.target[0].value
      const password = ev.target[1].value
  
      this.supabase.user.singUp(email, password).then(setToken)
    }
  
    logInSubmitted(ev: any): any {
      ev.preventDefault()
      const email = ev.target[0].value
      const password = ev.target[1].value
  
      this.supabase.user.signIn(email, password).then(setToken)
    }
  
    logoutSubmitted(ev: any): any {
      this.supabase.user.signOut().then(setToken)
    }
  }

  function setToken(response: any) {
    if (response.user.confirmation_sent_at && !response?.session?.access_token) {
      alert('Confirmation Email Sent')
    } else {
      (document.querySelector('#access-token') as HTMLInputElement).value = response.session.access_token
        (document.querySelector('#refresh-token') as HTMLInputElement).value = response.session.refresh_token
      alert('Logged in as ' + response.user.email)
    }
  }