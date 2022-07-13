import { SupabaseClient } from "@supabase/supabase-js";
import Board from "./Board";
import { IBoardRow } from "./schema";

export class BoardRepository {
    private readonly supabase: SupabaseClient
    constructor(supabase: SupabaseClient) {
        this.supabase = supabase
    }

    public async create(title: string) {
        const { data, error } = await this.supabase.from<IBoardRow>('boards').insert([
            { title }
        ])
        console.log(data, error);
        if (!data) return null

        return new Board(this.supabase, data[0].id)
    }

    public async list() {
        const { data, error } = await this.supabase.from<IBoardRow>('boards').select()
        console.log(data, error);
        return data
    }

    public async board(id: number) {
        return new Board(this.supabase, id)
    }
}