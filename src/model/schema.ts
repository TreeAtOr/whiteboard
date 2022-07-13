export interface IBoardRow {
    id: number,
    created_at: Date,
    title: string,
    owner_id: string
}

export interface IBoardMember {
    board_id: number,
    member_id: string
}