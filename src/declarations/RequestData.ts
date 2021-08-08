export enum Methods {
    get = 'get',
    post = 'post',
    delete = 'delete',
    options = 'options',
    put = 'put',
    patch = 'patch'
}

export enum Multipliers {
    second = 'second',
    minute = 'minute',
    hour = 'hour'
}

export interface RequestData {
    method: Methods,
    url?: String,
    frequency?: Number,
    multiplier?: Multipliers,
    threads?: Number,
}