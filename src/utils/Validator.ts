import { Multipliers, Methods } from '../declarations/RequestData';
import { Elements, Errors, ValidatorInterface } from '../declarations/Validator';

class Validator implements ValidatorInterface {

    private form: HTMLFormElement;
    private elements: Elements;
    public errors: Errors = {};

    constructor(form: HTMLFormElement, elements: Elements) {
        this.form = form;
        this.elements = elements;
    }

    public validateForm(): void {
        this.validateMethod()
        this.validateUrl();
        this.validateFrequency();
        this.validateMultiplier();
        this.validateThreads();
    }

    public validateMethod(): void {
        const method = this.elements.method.dataset.selected;
        const placeholder = this.form.querySelector('.validator-method');

        if (!(method in Methods)) {
            const message = 'Invalid Method';
            this.errors.method = message;
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
            delete this.errors.method
        }
    }

    public validateUrl(): void {
        const url = this.elements.url.value;
        const placeholder = this.form.querySelector('.validator-url');

        if (!url.length) {
            const message = 'Please enter a valid url';
            this.errors.url = message;
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
            delete this.errors.url
        }
    }

    public validateFrequency(): void {
        const frequency = parseInt(this.elements.frequency.value);
        const placeholder = this.form.querySelector('.validator-frequency');

        if (frequency <= 0) {
            const message = 'Invalid frequency';
            this.errors.frequency = message;
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
            delete this.errors.frequency
        }
    }

    public validateMultiplier(): void {
        const multiplier = this.elements.multiplier.dataset.selected;
        const placeholder = this.form.querySelector('.validator-multiplier');

        if (!(multiplier in Multipliers)) {
            const message = 'Invalid Multiplier';
            this.errors.multiplier = message;
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder);
            delete this.errors.multiplier
        }
    }

    public validateThreads(): void {
        const threads = parseInt(this.elements.threads.value);
        const placeholder = this.form.querySelector('.validator-threads');

        if (threads <= 0) {
            const message = 'Invalid Number Of Threads';
            this.errors.threads = message;
            this.fadeInMessage(placeholder, message);
        } else {
            this.fadeOutMessage(placeholder)
            delete this.errors.multiplier
        }
    }

    public fadeInMessage(element: Element, message: string): void {
        element.classList.remove('opacity-0');
        element.classList.remove('top-2');
        element.classList.add('opacity-100');
        element.classList.add('top-14')
        element.innerHTML = message;
    }

    public fadeOutMessage(element: Element): void {
        element.classList.add('opacity-0');
        element.classList.add('top-2');
        element.classList.remove('opacity-100');
        element.classList.remove('top-14')
    }
}

export default Validator;
