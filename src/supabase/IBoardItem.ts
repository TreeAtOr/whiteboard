import { ShapeConfig } from "konva/lib/Shape"

export interface ITextItem {
    type: "text"
}

export interface IRectItem {
    type: "rect"
}

export interface IImageItem {
    type: "image"
}

export interface ILineItem {
    type: "line"
}
export type IBoardItem = {
    id: string,
    type: string,
    style?: string,
    attrs: ShapeConfig,
    board_id: number
}