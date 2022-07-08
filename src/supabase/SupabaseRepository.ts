import { createClient, RealtimeChannel, RealtimeSubscription, SupabaseClient } from "@supabase/supabase-js";
import { BoardRepository } from "./BoardRepository";
import User from "./User";

export class SupabaseRepository {
    private readonly supabase: SupabaseClient

    public readonly user: User
    public readonly boards: BoardRepository

    constructor(SUPABASE_URL: string, SUPABASE_KEY: string) {
        this.supabase = createClient(SUPABASE_URL, SUPABASE_KEY)
        this.user = new User(this.supabase)
        this.boards = new BoardRepository(this.supabase)
    }
}