export type ValidatorComponent = {
    name: string;
    element: HTMLElement | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement | HTMLButtonElement;
    placeholder: HTMLElement;
};

export type ValidatorComponents = ValidatorComponent[];

export type Errors = {
    method?: string;
    url?: string;
    frequency?: string;
    multiplier?: string;
    threads?: string;
};

export interface ValidatorInterface {
    errors: Errors;

    validateForm(): void;

    validateMethod(): void;

    validateUrl(): void;

    validateFrequency(): void;

    validateMultiplier(): void;

    validateThreads(): void;
}
