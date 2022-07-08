import { SupabaseClient } from "@supabase/supabase-js"

export default class User {
    private readonly supabase: SupabaseClient
    constructor(supabase: SupabaseClient) {
        this.supabase = supabase
    }

    public async singUp(email: string, password: string) {
        const response = await this.supabase.auth.signUp({ email, password })
        return response
    }

    public async signIn(email: string, password: string) {
        const response = await this.supabase.auth.signIn({ email, password })
        return response
    }

    public async signOut() {
        const response = await this.supabase.auth.signOut()
        return response
    }

    public get details() {
        return this.supabase.auth.user()
    }
}