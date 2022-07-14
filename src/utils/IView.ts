export default interface IView {
    children?: IView[]
    render: () => string;
    activate: (...listeners: Array<(ev: any) => void>) => void
}