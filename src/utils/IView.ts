export default interface IView {
    children?: IView[]
    render: () => HTMLElement;
}