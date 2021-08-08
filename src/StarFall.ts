import axios from 'axios';
import { Multipliers, Methods, RequestData, Requests } from './declarations/RequestData';
import { Elements } from './declarations/Validator';
import UI from './utils/UI';
import Validator from './utils/Validator';

class StarFall {
    private UI: UI;
    private form: HTMLFormElement;
    private requestData: RequestData;
    private requests: Requests = {};
    private multipliers = {
        second: 1000,
        minute: 60000,
        hour: 3600000,
    };
    private threads: number[] = [];

    public initialize() {
        this.UI = new UI();
        this.UI.initialize();
        this.attachForm();
    }

    private attachForm() {
        this.form = <HTMLFormElement>document.getElementById('starfall-form');

        const stop = this.form.querySelector('[name=starfall-stop]');

        stop.addEventListener('click', (e: Event) => {
            e.preventDefault();
            this.stop();
        })

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

            validator.validateForm();

            if (Object.keys(validator.errors).length) return;

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

            this.charge();
        });
    }

    public charge() {
        // this.outgoingRequests = [];
        this.requests.requestCounter = 0;
        // this.lock = true;
        // this.status = 'Making it rain stars';
        const frequency = this.multipliers[this.requestData.multiplier] / this.requestData.frequency;

        this.requests.succeeded = 0;
        this.requests.failed = 0;
        this.requests.sent = 0;
        for (let i = 0; i < this.requestData.threads; i += 1) {
            const interval = window.setInterval(() => {
                this.requests.sent += 1;

                //         // Create an object from headers array
                //         const filledHeaders = {};
                //         this.headers.map((i) => {
                //             if (i.key && i.value) {
                //                 filledHeaders[i.key] = i.value;
                //             }
                //             return { ...filledHeaders };
                //         });

                //         // Set headers
                //         this.$http.interceptors.request.use((config) => {
                //             config.headers = { ...filledHeaders, ...config.headers };
                //             return config;
                //         });

                axios[this.requestData.method](this.requestData.url)
                    .then(() => {
                        this.requests.succeeded += 1;
                        // this.outgoingRequests.push({
                        //     no: this.requestCounter,
                        //     url: this.url,
                        //     status: 'Succeded',
                        //     code: res.status,
                        //     data: res.data,
                        //     method: this.method,
                        // });
                    })
                    .catch(() => {
                        this.requests.failed += 1;
                        // this.outgoingRequests.push({
                        //     no: this.requestCounter,
                        //     url: this.url,
                        //     status: 'Failed',
                        //     code: err.response ? err.response.status : 'NETWORK/CORS',
                        //     data: err.response ? err.response.data : null,
                        //     method: this.method,
                        // });
                    })
                    .finally(() => {
                        // this.outgoingRequests = this.outgoingRequests.slice(-10);
                        this.requests.requestCounter += 1;
                        this.showRequests();
                    });
            }, frequency);
            this.threads.push(interval);
        }
    }

    public showRequests() {
        const wrapper = document.querySelector('.starfall-requests');

        const succeeded = wrapper.querySelector('[data-ref=succeeded]');
        const failed = wrapper.querySelector('[data-ref=failed]');
        const sent = wrapper.querySelector('[data-ref=sent]');

        succeeded.innerHTML = this.requests.succeeded.toString();
        failed.innerHTML = this.requests.failed.toString();
        sent.innerHTML = this.requests.sent.toString();
    }

    public stop() {
        for (let i = 0; i < this.threads.length; i++) {
            clearInterval(this.threads[i]);
        }
    }
}

export default StarFall;
