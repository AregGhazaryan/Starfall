import { Multipliers, Methods } from '../declarations/Requests';
import { Errors, ValidatorComponents, ValidatorInterface } from '../declarations/Validator';
import Animations from './Animations';

class Validator implements ValidatorInterface {
    public components: ValidatorComponents;
    public errors: Errors = {};

    constructor(components: ValidatorComponents) {
        this.components = components;
    }

    public validateForm(): void {
        this.validateMethod();
        this.validateUrl();
        this.validateFrequency();
        this.validateMultiplier();
        this.validateThreads();
    }

    public validateMethod(): void {
        const component = this.components.find((i) => i.name === 'method');

        const method = component.element.dataset.selected;
        if (!(method in Methods)) {
            const message = 'Invalid Method';
            this.errors.method = message;
            component.placeholder.innerHTML = message;
        } else {
            delete this.errors.method;
        }
    }

    public validateUrl(): void {
        const component = this.components.find((i) => i.name === 'url');
        if ('value' in component.element) {
            const url = component.element.value;
            if (!url.length) {
                const message = 'Please enter a valid url';
                this.errors.url = message;
                component.placeholder.innerHTML = message;
            } else {
                delete this.errors.url;
            }
        }
    }

    public validateFrequency(): void {
        const component = this.components.find((i) => i.name === 'frequency');
        if ('value' in component.element) {
            const frequency = parseInt(component.element.value);
            if (frequency <= 0) {
                const message = 'Invalid frequency';
                this.errors.frequency = message;
                component.placeholder.innerHTML = message;
            } else {
                delete this.errors.frequency;
            }
        }
    }

    public validateMultiplier(): void {
        const component = this.components.find((i) => i.name === 'multiplier');
        const multiplier = component.element.dataset.selected;
        if (!(multiplier in Multipliers)) {
            const message = 'Invalid Multiplier';
            this.errors.multiplier = message;
            component.placeholder.innerHTML = message;
        } else {
            delete this.errors.multiplier;
        }
    }

    public validateThreads(): void {
        const component = this.components.find((i) => i.name === 'threads');
        if ('value' in component.element) {
            const threads = parseInt(component.element.value);
            if (threads <= 0) {
                const message = 'Invalid Number Of Threads';
                this.errors.threads = message;
                component.placeholder.innerHTML = message;
            } else {
                delete this.errors.threads;
            }
        }
    }

    public displayErrors(): void {
        const componentNames = this.components.map((i) => i.name);
        for (const name of componentNames) {
            if (name in this.errors) {
                Animations.descend(this.components.find((i) => i.name === name).placeholder);
            } else {
                Animations.ascend(this.components.find((i) => i.name === name).placeholder);
            }
        }
    }
}

export default Validator;
