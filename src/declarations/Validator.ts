export type Elements = {
    method: HTMLElement,
    url: HTMLInputElement,
    frequency: HTMLInputElement,
    multiplier: HTMLElement,
    threads: HTMLInputElement
}

export type Errors = {
    method?: string,
    url?: string,
    frequency?: string,
    multiplier?: string,
    threads?: string
}

export interface ValidatorInterface {
    errors: Errors;

    validateForm(): void;

    validateMethod(): void;

    validateUrl(): void;

    validateFrequency(): void;

    validateMultiplier(): void;

    validateThreads(): void;

    fadeInMessage(element: Element, message: string): void;

    fadeOutMessage(element: Element): void;
}