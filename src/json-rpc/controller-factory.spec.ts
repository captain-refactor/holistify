import {JsonRpcControllerFactory} from "./controller-factory";
import * as express from 'express';
import {promisify} from "util";
import axios from 'axios';
import {ok} from "assert";

describe('controler factory', function () {
    it('should create controller', async function () {
        class TestService {
            async greet() {
                return 'hello';
            }
        }

        let TestServiceController = JsonRpcControllerFactory.create(TestService);
        let instance = new TestService();
        let app = express();
        new TestServiceController(instance, app);
        await (promisify(app.listen)as any)(4000);
        let response = await axios.post('http://127.0.0.1:4000/TestService/greet', []);
        ok(response.data === 'hello');
    });
});