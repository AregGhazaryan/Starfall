export default interface HandlersInterface {
    selectNodes: NodeList;

    handleSelect(event: Event): Boolean;

    handleOption(event: Event): String;
}