import {HttpClient} from "@martin_hotell/axios-http";

export interface IControllable<T = any> {
    new(...args): T;
}

// type Extend<T, K extends keyof T = keyof T> = {
//     [P in K]: T[K];
// }

export type IClientConstructor<T> = {
    new(http: HttpClient): T
};