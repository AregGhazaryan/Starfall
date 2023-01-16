import axios, { AxiosRequestConfig } from 'axios';
import { AnimationNames } from './declarations/Animations';
import { Multipliers, Methods, RequestData, Requests, RequestLog } from './declarations/Requests';
import { ValidatorComponents } from './declarations/Validator';
import Animations from './utils/Animations';
import UI from './utils/UI';
import Validator from './utils/Validator';

class StarFall {
    private UI: UI;
    private form: HTMLFormElement;
    private requestData: RequestData;
    private lock: boolean;
    private requests: Requests = {};
    private threads: number[] = [];
    private requestLogs: RequestLog[] = [];
    private multipliers = {
        second: 1000,
        minute: 60000,
        hour: 3600000,
    };

    public initialize(): void {
        this.UI = new UI();
        this.UI.initialize();
        this.attachForm();
    }

    private attachForm(): void {
        this.form = <HTMLFormElement>document.getElementById('starfall-form');

        const stop = this.form.querySelector('[name=starfall-stop]');

        stop.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.stop();
        });

        this.form.addEventListener('submit', (e: Event) => {
            e.preventDefault();
            const form = <HTMLFormElement>e.currentTarget;

            const methodElement = <HTMLElement>form.querySelector('[name=starfall-method]');
            const methodPlaceholder = <HTMLElement>this.form.querySelector('.validator-method');
            const urlElement = <HTMLInputElement>form.querySelector('[name=starfall-url]');
            const urlPlaceholder = <HTMLElement>this.form.querySelector('.validator-url');
            const frequencyElement = <HTMLInputElement>form.querySelector('[name=starfall-frequency]');
            const frequencyPlaceholder = <HTMLElement>this.form.querySelector('.validator-frequency');
            const multiplierElement = <HTMLInputElement>form.querySelector('[name=starfall-multiplier]');
            const multiplierPlaceholder = <HTMLElement>this.form.querySelector('.validator-multiplier');
            const threadsElement = <HTMLInputElement>form.querySelector('[name=starfall-threads]');
            const threadsPlaceholder = <HTMLElement>this.form.querySelector('.validator-threads');

            const components = [
                { name: 'method', element: methodElement, placeholder: methodPlaceholder },
                { name: 'url', element: urlElement, placeholder: urlPlaceholder },
                { name: 'frequency', element: frequencyElement, placeholder: frequencyPlaceholder },
                { name: 'multiplier', element: multiplierElement, placeholder: multiplierPlaceholder },
                { name: 'threads', element: threadsElement, placeholder: threadsPlaceholder },
            ] as ValidatorComponents;

            const validator = new Validator(components);

            validator.validateForm();

            if (Object.keys(validator.errors).length) {
                validator.displayErrors();
                return;
            }

            const method = <Methods>methodElement.dataset.selected;

            const url = urlElement.value;

            const frequency = parseInt(frequencyElement.value);

            const multiplier = <Multipliers>multiplierElement.dataset.selected;

            const threads = parseInt(threadsElement.value);

            this.requestData = {
                method,
                url,
                frequency,
                multiplier,
                threads,
            };

            this.charge();
        });
    }

    public charge(): void {
        Animations.animateSelector('.starlight-interruption', AnimationNames.FadeOut);
        if (this.lock) return;
        this.requests.requestCounter = 0;
        this.lock = true;
        const frequency = this.multipliers[this.requestData.multiplier] / this.requestData.frequency;

        this.requests.succeeded = 0;
        this.requests.failed = 0;
        this.requests.sent = 0;

        let counter = 1;

        for (let i = 0; i < this.requestData.threads; i += 1) {
            const interval = window.setInterval(() => {
                this.requests.sent += 1;

                const url = new URL(this.requestData.url);
                const config = {
                    url: url.href,
                    method: this.requestData.method,
                } as AxiosRequestConfig;

                axios(config)
                    .then((response) => {
                        this.requests.succeeded += 1;
                        const log = {
                            no: counter,
                            timestamp: new Date(),
                            url: url.pathname,
                            status: 'Succeeded',
                            code: response.status || 'NETWORK/CORS',
                            method: this.requestData.method,
                        };

                        this.requestLogs.push(log);
                    })
                    .catch((err) => {
                        const { response } = err;
                        this.requests.failed += 1;
                        const log = {
                            no: counter,
                            timestamp: new Date(),
                            url: url.pathname,
                            status: 'Failed',
                            code: response?.status || 'NETWORK/CORS',
                            method: this.requestData.method,
                        };

                        this.requestLogs.push(log);

                        if (err.response) {
                            if (err.response.status === 429) {
                                this.interrupt();
                            }
                        } else {
                            console.log(err);
                        }
                    })
                    .finally(() => {
                        this.requestLogs = this.requestLogs.slice(-10);
                        this.requests.requestCounter += 1;
                        this.updateRequests();
                        counter += 1;
                    });
            }, frequency);
            this.threads.push(interval);
        }
    }

    public updateRequests(): void {
        const wrapper = document.querySelector('.starfall-requests');

        const succeeded = wrapper.querySelector('[data-ref=succeeded]');
        const failed = wrapper.querySelector('[data-ref=failed]');
        const sent = wrapper.querySelector('[data-ref=sent]');

        succeeded.innerHTML = this.requests.succeeded.toString();
        failed.innerHTML = this.requests.failed.toString();
        sent.innerHTML = this.requests.sent.toString();

        const tableWrapper = document.querySelector('.starfall-requests-table');

        const tbody = tableWrapper.querySelector('tbody');

        const lastItem = this.requestLogs[this.requestLogs.length - 1];

        const tr = document.createElement('tr');

        const no = document.createElement('td');
        no.innerHTML = lastItem.no.toString();

        const timestamp = document.createElement('td');
        timestamp.innerHTML = lastItem.timestamp.toLocaleTimeString();

        const url = document.createElement('td');
        url.innerHTML = lastItem.url;

        const method = document.createElement('td');
        method.innerHTML = lastItem.method;

        const status = document.createElement('td');
        status.innerHTML = lastItem.status;

        const code = document.createElement('td');
        code.innerHTML = lastItem.code.toString();

        tr.appendChild(no);
        tr.appendChild(timestamp);
        tr.appendChild(url);
        tr.appendChild(method);
        tr.appendChild(status);
        tr.appendChild(code);

        tbody.appendChild(tr);

        if (tbody.childElementCount > 10) {
            tbody.removeChild(tbody.firstChild);
        }
    }

    public stop(): void {
        for (let i = 0; i < this.threads.length; i++) {
            clearInterval(this.threads[i]);
        }
        this.lock = false;
    }

    public interrupt(): void {
        this.stop();
        Animations.animateSelector('.starlight-interruption', AnimationNames.FadeIn);
    }
}

export default StarFall;
