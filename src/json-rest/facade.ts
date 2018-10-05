export interface IControllable<T = any> {
    new(...args): T;
}

// type Extend<T, K extends keyof T = keyof T> = {
//     [P in K]: T[K];
// }

export interface IClientOptions {
    // path?: string;
}

export type IClientConstructor<T> = {
    new(options?: IClientOptions): T
};