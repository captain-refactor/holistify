import {JsonRpcClientFactory} from "./client-factory";
import {ok} from "assert";
import {IClientConstructor} from "./facade";

describe('Client factory', function () {
    it('should create proxy', function () {
        class A {
            hello;
        }

        let f = new JsonRpcClientFactory();
        let ClientA: IClientConstructor<A> = f.createClient(A);
        let a = new ClientA(null);
        ok(a.hello === 'success');
    });
});