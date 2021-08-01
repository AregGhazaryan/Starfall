import Handlers from './Handlers';

class UI extends Handlers implements UI {
    public selects: NodeList;

    initialize() {
        this.initializeSelects();
    }

    initializeSelects() {
        this.selects = document.querySelectorAll('.starlight-select')

        this.selects.forEach(el => {
            (el as HTMLElement).querySelectorAll('button').forEach(option =>
                option.addEventListener('click', this.handleOption)
            )

            el.addEventListener('click', this.handleSelect)

        })
    }
}

export default UI;