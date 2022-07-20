import { RealtimeSubscription, SupabaseClient, SupabaseRealtimePayload } from "@supabase/supabase-js"
import { IBoardItem } from "./IBoardItem"
import { IBoardMember, IBoardRow } from "./schema"
import { WithID } from "./utils"

export default class Board {
    private readonly supabase: SupabaseClient
    public readonly id: number
    public readonly realtime?: RealtimeSubscription

    public onUpdate: (payload: SupabaseRealtimePayload<IBoardItem>) => void
    public onInsert: (payload: SupabaseRealtimePayload<IBoardItem>) => void
    public onDelete: (payload: SupabaseRealtimePayload<IBoardItem>) => void


    constructor(supabase: SupabaseClient, id: number) {
        this.supabase = supabase
        this.realtime = this.supabase.from<IBoardItem>(`board-items:board_id=eq.${id}`)
            .on('UPDATE', payload => console.log("UPDATE",this.onUpdate(payload)))
            .on('INSERT', payload => console.log("INSERT",this.onInsert(payload)))
            .on('DELETE', payload => console.log("DELETE",this.onDelete(payload)))
            .subscribe()
        this.id = id
    }

    public async addMember(member_id: string) {
        const { data, error } = await this.supabase.from<IBoardMember>('boards-members').insert([
            { board_id: this.id, member_id }
        ], { returning: "representation" })
        return data
    }

    public async removeMember(member_id: string) {
        const { data, error } = await this.supabase.from<IBoardMember>('boards-members').delete({ returning: "representation" }).match({ board_id: this.id, member_id })
        return data
    }

    public async uploadImage(filename: string, file: Blob) {
        const { data, error } = await this.supabase.storage.from('content').upload(`${this.id}/${filename}`, file)
        error && console.error(error);
        return data
    }

    public async downloadImage(filename: string) {
        const { data, error } = await this.supabase.storage.from('content').download(`${this.id}/${filename}`)
        error && console.error(error);
        return data
    }

    public async addItem(item: IBoardItem) {
        const { data, error } = await this.supabase.from<IBoardItem>('board-items').insert(item)
        error && console.error(error);
        //@ts-ignore
        this.onInsert({old: item, new: item})
        return data
    }

    public async removeItem(id: string) {
        const { data, error } = await this.supabase.from<IBoardItem>('board-items').delete().match({ id })
        error && console.error(error);
        return data
    }

    public async mutateItem(item: Partial<IBoardItem>) {
        const { data, error } = await this.supabase.from<IBoardItem>('board-items').update(item).match({ id: item.id })
        error && console.error(error);
        return data
    }

    public async loadItems() {
        const { data, error } = await this.supabase.from<IBoardItem>('board-items').select().match({ board_id: this.id })
        error && console.error(error);
        
        return data
    }

}