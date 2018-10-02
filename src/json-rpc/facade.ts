import {HttpClient} from "@martin_hotell/axios-http";

export interface IControllable<T = any> {
    new(...args): T;
}

export interface IClientConstructor<T> {
    new(http: HttpClient): T
}