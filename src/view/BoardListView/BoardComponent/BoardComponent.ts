//@ts-ignore
import template from './BoardComponent.t.html'
import IView from '../../../utils/IView'

export class BoardView implements IView {
    title: string
    constructor(title: string) {
        this.title = title
    }
    render() {
        return (template as string).replace("$1",this.title)
    }

    activate() {

    };

}