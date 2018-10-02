import {JsonRpcClientFactory} from "./client-factory";
import {ok} from "assert";
import {IClientConstructor} from "./facade";
import * as nock from 'nock';

describe('Client factory', function () {
    let factory = new JsonRpcClientFactory();

    it('should create proxy', function () {
        class A {
            hello;
        }

        let ClientA: IClientConstructor<A> = factory.createClient(A);
        console.log(ClientA.name);
        let a = new ClientA(null);
        ok(a.hello === 'success');
        ok(a instanceof ClientA);
    });

    it('should return constructor with name class+CLient', function () {
        class X {}

        let Client = factory.createClient(X);
        ok(Client.name === 'XClient');
    });

    it('should create request', async function () {
        nock.recorder.rec();
        class TestClass {
            async greet() {
            }
        }

        let Client = factory.createClient(TestClass);
        let client = new Client();
        await client.greet();
        nock.restore();
    });
});