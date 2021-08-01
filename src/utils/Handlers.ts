class Handlers {

    private selectNodes: NodeList;

    constructor() {
        this.selectNodes = document.querySelectorAll('.starlight-select');

        window.addEventListener('click', (e: Event) => {
            this.selectNodes.forEach((select: HTMLElement) => {
                if (!select.contains(<HTMLElement>e.target)) {
                    select.querySelector('.starlight-options').classList.remove('open')
                }
            })
        });
    }

    protected handleSelect(event: Event): Boolean {
        const element = <HTMLDivElement>event.currentTarget;

        return element.querySelector('.starlight-options').classList.toggle('open')
    }

    protected handleOption(event: Event): String {
        const option = <HTMLButtonElement>event.currentTarget;
        const value = option.dataset.value;

        const wrapper = option.closest('.starlight-options');
        wrapper.querySelectorAll('button').forEach(el => el.classList.remove('active'));

        const select: HTMLElement = option.closest('.starlight-select');
        select.dataset.selected = value;
        select.querySelector('.selected').innerHTML = value.toUpperCase();

        option.classList.add('active');

        return value;
    }
}

export default Handlers;