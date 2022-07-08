import { RealtimeSubscription, SupabaseClient } from "@supabase/supabase-js"
import { IBoardItem } from "./IBoardItem"
import { IBoardMember, IBoardRow } from "./schema"
import { WithID } from "./utils"

export interface IBoard {
    title: string,
    items: Array<WithID<IBoardItem>>
}

export default class Board {
    private readonly supabase: SupabaseClient
    public readonly id: number
    public readonly realtime?: RealtimeSubscription

    public data:  IBoard

    public onUpdate: (payload: any) => void

    constructor(supabase: SupabaseClient, id: number) {
        this.supabase = supabase
        this.realtime = this.supabase.from<IBoardRow>(`realtime:public:boards:id=eq.${id}`).on('UPDATE', payload => {
            //TODO add data validation
            this.data = JSON.parse(payload.new.board)
            this.onUpdate(payload)
        }).subscribe()
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

    public async update() {
        const { data, error } = await this.supabase.from<IBoardRow>('board').update({ id: this.id, board: JSON.stringify(this.data) })
        return data
    }

    public async uploadImage(filename: string, file: Blob) {
        const { data, error } = await this.supabase.storage.from('content').upload(`${this.id}/${filename}`, file)
        return data
    }

    public async downloadImage(filename: string) {
        const { data, error } = await this.supabase.storage.from('content').download(`${this.id}/${filename}`)
        return data
    }

    public async addItem(item: IBoardItem) {
        const _item : WithID<IBoardItem> = item

        this.data.items.push({...item,id: self.crypto.randomUUID()})
        return this.update()
    }

    public async removeItem(id: string) {
        this.data.items = this.data.items.filter((item) => item.id !== id)
        return this.update()
    }

    public async mutateItem(item: WithID<IBoardItem>) {
        const oldI = this.data.items.findIndex(v => v.id === item.id)
        if(!~oldI) return null
        this.data.items[oldI] = item
        return this.update()
    }

}