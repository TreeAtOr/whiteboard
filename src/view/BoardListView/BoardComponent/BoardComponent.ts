//@ts-ignore
import template from './BoardComponent.t.html'
import IView from '../../../utils/IView'

export class BoardComponent implements IView {
    title: string;
    id: string;
    onMove: (id: string) => void;
    onDelete: (id: string) => void;

    constructor(title: string, id: number) {
        this.title = title
        this.id = String(id)
    }
    render() {
        return (template as string).replace("$1", this.title).replace("$2", this.id)
    }

    activate() {
        document.querySelector(`#move-${this.id}`)?.addEventListener("onclick", (ev) => this.onMove(this.id))
        document.querySelector(`#delete-${this.id}`)?.addEventListener("onclick", (ev) => this.onDelete(this.id))
    };

}