import Konva from "konva";
import { Group } from "konva/lib/Group";
import { Layer } from "konva/lib/Layer";
import { KonvaEventObject } from "konva/lib/Node";
import { Shape, ShapeConfig } from "konva/lib/Shape";
import { Circle } from "konva/lib/shapes/Circle";
import { Rect } from "konva/lib/shapes/Rect";
import { Transformer } from "konva/lib/shapes/Transformer";
import { Stage } from "konva/lib/Stage";
import { Transform } from "konva/lib/Util";
import { IBoardItem } from "../model/IBoardItem";

const DEFAULT_SELECT_RECT_PARAMS = {
    fill: 'rgba(0,0,255,0.5)',
    visible: false,
}

export default class Scene {
    private stage: Stage
    private layer: Layer

    private transformer: Transformer
    private selectRect: Rect
    private selection: [number, number][]
    private selected: (Shape<ShapeConfig> | Group)[]

    private _mousedownTouchstart(e: KonvaEventObject<any>) {
        if (e.target !== this.stage) {
            return;
        }
        e.evt.preventDefault();
        this.selection[0][0] = this.stage.getPointerPosition().x;
        this.selection[0][1] = this.stage.getPointerPosition().y;
        this.selection[1][0] = this.stage.getPointerPosition().x;
        this.selection[1][1] = this.stage.getPointerPosition().y;

        this.selectRect.visible(true);
        this.selectRect.width(0);
        this.selectRect.height(0);
    }

    public onInsert: (id: string, payload: ShapeConfig) => void;
    public onUpdate: (id: string, payload: ShapeConfig) => void;
    public onDelete: (id: string) => void;


    private _transformend(e: KonvaEventObject<Shape>) {
        const item = e.target
        if (!this.onUpdate) return;
        this.onUpdate(item.id(), item.attrs)
    }

    private _mousemoveTouchmove(e: KonvaEventObject<any>) {
        if (!this.selectRect.visible()) {
            return;
        }
        e.evt.preventDefault();
        this.selection[1][0] = this.stage.getPointerPosition().x;
        this.selection[1][1] = this.stage.getPointerPosition().y;

        this.selectRect.setAttrs({
            x: Math.min(this.selection[0][0], this.selection[1][0]),
            y: Math.min(this.selection[0][1], this.selection[1][1]),
            width: Math.abs(this.selection[1][0] - this.selection[0][0]),
            height: Math.abs(this.selection[1][1] - this.selection[0][1]),
        });
    }

    private _mouseupTouchend(e: KonvaEventObject<any>) {
        if (!this.selectRect.visible()) {
            return;
        }
        e.evt.preventDefault();
        // update visibility in timeout, so we can check it in click event
        setTimeout(() => {
            this.selectRect.visible(false);
        });

        const shapes = this.stage.getChildren()[0].getChildren();
        const box = this.selectRect.getClientRect();
        this.selected = shapes.filter((shape) =>
            Konva.Util.haveIntersection(box, shape.getClientRect())
        );
        this.transformer.nodes(this.selected);
    }

    private _clickTap(e: KonvaEventObject<any>) {
        if (this.selectRect.visible()) {
            return;
        }

        if (e.target === this.stage) {
            this.transformer.nodes([]);
            return;
        }
        console.log(e.target.getType());

        if (e.target.getType() !== 'Shape') {
            return;
        }

        const metaPressed = e.evt.shiftKey || e.evt.ctrlKey || e.evt.metaKey;
        const isSelected = this.transformer.nodes().indexOf(e.target) >= 0;

        if (!metaPressed && !isSelected) {
            this.transformer.nodes([e.target]);
        } else if (metaPressed && isSelected) {
            const nodes = this.transformer.nodes().slice();
            nodes.splice(nodes.indexOf(e.target), 1);
            this.transformer.nodes(nodes);
        } else if (metaPressed && !isSelected) {
            const nodes = this.transformer.nodes().concat([e.target]);
            this.transformer.nodes(nodes);
        }
    }

    public forSelected(mutator: (shape: Shape) => void, clearSelection: boolean = true) {
        this.selected.forEach(mutator)
        if (clearSelection) this.transformer.nodes([])
        this.layer.draw()
    }

    /**
     * @deprecated
     */
    public deleteSelected() {
        this.selected.forEach((shape) => shape.destroy())
        this.transformer.nodes([])
        this.layer.draw()
    }

    public moveSelectedZ(value: -1 | 1 | "forward" | "backward") {
        this.selected.forEach((item) => {
            if (value === "backward") item.moveToBottom()
            if (value === "forward") item.moveToTop()
            if (value === 1) item.moveUp()
            if (value === -1) item.moveDown()
        })
    }

    /*
    BUG: 
        - nothing selected, you click and "too much recursion" error appears
    */
    constructor(container: string, width: number, height: number, selectRectParams = DEFAULT_SELECT_RECT_PARAMS) {
        this.stage = new Stage({ container, width, height });
        this.layer = new Layer();

        this.transformer = new Transformer()
        this.selectRect = new Rect(selectRectParams)
        this.selection = [[0, 0], [0, 0]]
        this.selected = []

        this.transformer.nodes([])

        this.layer.add(this.transformer)
        this.layer.add(this.selectRect)
        this.stage.add(this.layer)

        this.stage.on('mousedown touchstart', this._mousedownTouchstart.bind(this))
        this.stage.on('mousemove touchmove', this._mousemoveTouchmove.bind(this))
        this.stage.on('mouseup touchend', this._mouseupTouchend.bind(this))
        this.stage.on('click tap', this._clickTap.bind(this))

        this.stage
    }

    public async addKonvaItem(item: Shape | Promise<Shape>) {
        item = await item

        item.on('transformend', this._transformend.bind(this))
        item.on('dragend', this._transformend.bind(this))
        //@ts-ignore
        item.onUpdate = this.onUpdate;
        this.layer.add(item)
    }

    public removeItem(id: string) {
        console.log(id)
        return this.layer.findOne('#' + id).destroy()
    }

    public mutateItem(id: string, attrs: ShapeConfig) {
        return this.layer.findOne('#' + id).setAttrs(attrs)
    }


}