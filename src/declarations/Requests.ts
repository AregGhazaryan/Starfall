export enum Methods {
    get = 'get',
    post = 'post',
    delete = 'delete',
    options = 'options',
    put = 'put',
    patch = 'patch',
}

export enum Multipliers {
    second = 'second',
    minute = 'minute',
    hour = 'hour',
}

export interface RequestData {
    method?: Methods;
    url?: string;
    frequency?: number;
    multiplier?: Multipliers;
    threads?: number;
}

export type Requests = {
    requestCounter?: number;
    succeeded?: number;
    failed?: number;
    sent?: number;
};

export type RequestLog = {
    no: number;
    url: string;
    status: string;
    code: number | string;
    method: Methods;
};
