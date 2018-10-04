import {JsonRpcClientFactory} from "./client-factory";
import {ok} from "assert";
import * as nock from 'nock';

describe('Client factory', function () {
    let factory = new JsonRpcClientFactory();

    // it('should create proxy', function () {
    //     class A {
    //         hello;
    //     }
    //
    //     let ClientA: IClientConstructor<A> = factory.createClient(A);
    //     console.log(ClientA.name);
    //     let a = new ClientA(null);
    //     ok(a.hello === 'success');
    //     ok(a instanceof ClientA);
    // });

    it('should return constructor with name class+CLient', function () {
        class X {
        }

        let Client = factory.createClient(X);
        ok(Client.name === 'XClient');
    });

    it('should create request', async function () {
        nock('http://localhost:80')
            .post('/TestClass/greet', [])
            .reply(200, "hello");

        class TestClass {
            async greet() {
                return 'hello';
            }
        }

        let Client = factory.createClient(TestClass);
        let client = new Client();
        let result = await client.greet();
        ok(result === 'hello');
        nock.restore();
    });


});