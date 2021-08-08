import axios from 'axios';
import { Multipliers, Methods, RequestData } from './declarations/RequestData';
import { Elements } from './declarations/Validator';
import UI from './utils/UI';
import Validator from './utils/Validator';

class StarFall {
    private UI: UI;
    private form: HTMLFormElement;
    private requestData: RequestData;

    public initialize() {
        this.UI = new UI();
        this.UI.initialize();
        this.attachForm();
    }

    private attachForm() {
        this.form = <HTMLFormElement>document.getElementById('starfall-form');

        this.form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const form = <HTMLFormElement>e.currentTarget;

            const methodElement = <HTMLElement>form.querySelector('[name=starfall-method]');
            const urlElement = <HTMLInputElement>form.querySelector('[name=starfall-url]');
            const frequencyElement = <HTMLInputElement>form.querySelector('[name=starfall-frequency]');
            const multiplierElement = <HTMLInputElement>form.querySelector('[name=starfall-multiplier]');
            const threadsElement = <HTMLInputElement>form.querySelector('[name=starfall-threads]');

            const elements = {
                method: methodElement,
                url: urlElement,
                frequency: frequencyElement,
                multiplier: multiplierElement,
                threads: threadsElement
            }

            const validator = new Validator(form, <Elements>elements);

            validator.validateMethod()

            validator.validateUrl();
            validator.validateFrequency();
            validator.validateMultiplier();
            validator.validateThreads();

            const method = <Methods>methodElement.dataset.selected;

            const url = urlElement.value;

            const frequency = parseInt(frequencyElement.value);

            const multiplier = <Multipliers>multiplierElement.dataset.selected;

            const threads = parseInt(threadsElement.value)

            this.requestData = {
                method,
                url,
                frequency,
                multiplier,
                threads
            }

            console.log(this.requestData)
        });
    }
}

export default StarFall;
