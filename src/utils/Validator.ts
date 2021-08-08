import { Multipliers, Methods } from '../declarations/RequestData';
import { Elements } from '../declarations/Validator';

class Validator {

    private form: HTMLFormElement;
    private elements: Elements;

    constructor(form: HTMLFormElement, elements: Elements) {
        this.form = form;
        this.elements = elements;
    }

    public validateForm() {
        this.validateMethod();
    }

    public validateMethod() {
        const method = this.elements.method.dataset.selected;
        const placeholder = this.form.querySelector('.validator-method');

        if (!(method in Methods)) {
            const message = 'Invalid Method';
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
        }
    }

    public validateUrl() {
        const url = this.elements.url.value;
        const placeholder = this.form.querySelector('.validator-url');

        if (!url.length) {
            const message = 'Please enter a valid url';
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
        }
    }

    public validateFrequency() {
        const frequency = parseInt(this.elements.frequency.value);
        const placeholder = this.form.querySelector('.validator-frequency');

        if (frequency <= 0) {
            const message = 'Invalid frequency';
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
        }
    }

    public validateMultiplier() {
        const multiplier = this.elements.multiplier.dataset.selected;
        const placeholder = this.form.querySelector('.validator-multiplier');

        if (!(multiplier in Multipliers)) {
            const message = 'Invalid Multiplier';
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder);
        }
    }

    public validateThreads() {
        const threads = parseInt(this.elements.threads.value);
        const placeholder = this.form.querySelector('.validator-threads');

        if (threads <= 0) {
            const message = 'Invalid Number Of Threads';
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
        }
    }

    public fadeInMessage(element: Element, message: string) {
        element.classList.remove('opacity-0');
        element.classList.remove('top-2');
        element.classList.add('opacity-100');
        element.classList.add('top-14')
        element.innerHTML = message;
    }

    public fadeOutMessage(element: Element) {
        element.classList.add('opacity-0');
        element.classList.add('top-2');
        element.classList.remove('opacity-100');
        element.classList.remove('top-14')
    }
}

export default Validator;
