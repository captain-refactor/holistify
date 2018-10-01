export interface IControllable<T = any> {
    new(...args): T;
}

export class JsonRpcControllerFactory {
    static create(constructor: IControllable) {
        return class {

        }
    }
}