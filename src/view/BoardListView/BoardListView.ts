//@ts-ignore
import template from './BoardListView.t.html'
import IView from '../../utils/IView'
import { IBoardRow } from "../../model/schema"
import { BoardComponent } from './BoardComponent/BoardComponent';

export class BoardListView implements IView {
    children: IView[];
    list: IBoardRow[];

    onDelete: (id: string) => void;
    onMove: (id: string) => void;

    onCreate: () => void;
    constructor(list: IBoardRow[]) {
        this.list = list
        this.children = this.list.map(({ title, id }) => new BoardComponent(title, id))
        this.children.forEach((child) => (child as BoardComponent).onMove = this.onMove)
    }
    render() {
        return template.replace('$1', this.children.map((child) => child.render()).join(''))
    }

    activate() {
        this.children.forEach((child) => child.activate())
    };

}