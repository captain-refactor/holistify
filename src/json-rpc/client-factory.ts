import {IClientConstructor, IControllable} from "./facade";
import {HttpClient} from "@martin_hotell/axios-http";
import {Inject} from "injection-js";


export class JsonRpcClientFactory {
    createClient<T>(constructor: IControllable<T>): IClientConstructor<T> {
        return class {
            static get parameters() {
                return [new Inject(HttpClient)];
            }

            constructor(private http: HttpClient) {

            }
        } as any;
    }
}