import axios from 'axios';
import UI from './utils/UI';

class StarFall {
    private UI: UI;
    private form: HTMLFormElement;

    public initialize() {
        this.UI = new UI();
        this.UI.initialize();
        this.attachForm();
    }

    private attachForm() {
        this.form = <HTMLFormElement>document.getElementById('starfall-form');
        this.form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
        });
    }
}

export default StarFall;
