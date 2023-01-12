import UIInterface from '../declarations/UIInterface';
import Handlers from './Handlers';

class UI extends Handlers implements UIInterface {
    selects: NodeList;

    public initialize(): void {
        this.initializeSelects();
    }

    public initializeSelects(): void {
        this.selects = document.querySelectorAll('.starlight-select');

        this.selects.forEach((el) => {
            (el as HTMLElement).querySelectorAll('button').forEach((option) => option.addEventListener('click', this.handleOption));

            el.addEventListener('click', this.handleSelect);
        });
    }
}

export default UI;
