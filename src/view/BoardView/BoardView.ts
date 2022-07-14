//@ts-ignore
import template from './BoardView.t.html'
import IView from '../../utils/IView'


export class BoardView implements IView {
    render() {
        return template
    }

    onTool: (name: string) => void
    onMenu: () => void

    activate() {
        document.querySelector(`#image-tool`)?.addEventListener("onclick", () => this.onTool("image"))
        document.querySelector(`#rect-tool`)?.addEventListener("onclick", () => this.onTool("rect"))
        document.querySelector(`#line-tool`)?.addEventListener("onclick", () => this.onTool("line"))
        document.querySelector(`#text-tool`)?.addEventListener("onclick", () => this.onTool("text"))
        document.querySelector(`#image-tool`)?.addEventListener("onclick", () => this.onTool("plus"))

        document.querySelector(`#menu-button`)?.addEventListener("onclick", () => this.onMenu())
    };

}