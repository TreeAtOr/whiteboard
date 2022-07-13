import { Shape, ShapeConfig } from "konva/lib/Shape";
import { IBoardItem } from "./supabase/IBoardItem";

export default class KonvaIBoardConverter {
    private items: Map<string, (id: string, style: ShapeConfig, attrs: ShapeConfig) => Shape | Promise<Shape>>;
    private styles: Map<string, ShapeConfig>
    private default: string = "default"
    constructor() {
        this.styles = new Map<string, ShapeConfig>;
        this.items = new Map<string, (id: string, style: ShapeConfig, attrs: ShapeConfig) => Shape | Promise<Shape>>;
    }

    public createStyle(name: string, config: ShapeConfig) {
        this.styles.set(name, config)
    }

    public registerItem(name: string, constructor: (id: string, style: ShapeConfig, attrs: ShapeConfig) => Shape | Promise<Shape>) {
        this.items.set(name, constructor)
    }

    public setDefaultStyle(name: string) {
        this.default = name
    }

    public resolveStyle(name: string = "default") {
        let style = this.styles.get(name)
        if (!style) style = this.styles.get(this.default)
        if (!style) throw new Error("You are trying get invalid style, when default style is undefined")
        return style
    }

    public convertItem(item: IBoardItem) {
        const style = this.resolveStyle(item.style)
        const constructor = this.items.get(item.type)
        if (!constructor) throw new Error("You are trying to create item what not exist")
        return constructor(item.id, style, item.attrs)
    }

}