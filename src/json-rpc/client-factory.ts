import {IClientConstructor, IControllable} from "./facade";
import Axios, {AxiosInstance} from 'axios';

export class ClientProxyHandler<T extends object = any> implements ProxyHandler<T> {
    axios: AxiosInstance = Axios.create({method: 'POST', responseType: 'json'});

    constructor(private className: string) {

    }

    get(target: T, p: string, receiver: any): any {
        return async (...args) => {
            return await this.axios.post(`/${this.className}/${p}`, args)
        };
    }
}

export class JsonRpcClientFactory {
    createClient<T extends object = any>(constructor: IControllable<T>): IClientConstructor<T> {
        let className = constructor.name;
        let clientName = className + 'Client';

        let clientConstructor = class {
            // static get parameters() {
            //     return [new Inject(HttpClient)];
            // }
            constructor() {
                let instance = new Proxy<T>(this as any, new ClientProxyHandler<T>(className));
                return instance as any;
            }

        } as any;
        Object.defineProperty(clientConstructor, 'name', {value: clientName});
        return clientConstructor;
    }
}