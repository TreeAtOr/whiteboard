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

export type IBoardItem = ITextItem | IRectItem | IImageItem | ILineItem