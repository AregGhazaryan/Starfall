interface Handlers {
    private selectNodes: NodeList;

    public handleSelect(event: Event): Boolean;

    public handleOption(event: Event): Boolean;
}