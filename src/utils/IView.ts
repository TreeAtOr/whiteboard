export default interface IView {
    render: () => string;
    activate: (...listeners: Array<(ev: any) => void>) => void
}