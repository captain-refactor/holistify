import {IClientConstructor, IControllable} from "./facade";
// import {HttpClient} from "@martin_hotell/axios-http";
import {Inject} from "injection-js";


export class ClientProxyHandler<T extends object = any> implements ProxyHandler<T> {
    get(target: T, p: PropertyKey, receiver: any): any {
        console.log(p);
        return 'success';
    }
}

export class JsonRpcClientFactory {
    createClient<T extends object = any>(constructor: IControllable<T>): IClientConstructor<T> {
        return class {
            static get parameters() {
                return [new Inject(HttpClient)];
            }

            constructor(private http: HttpClient) {
                let instance = new Proxy<T>(this as any, new ClientProxyHandler<T>())
                return instance as any;
            }

        } as any;
    }
}