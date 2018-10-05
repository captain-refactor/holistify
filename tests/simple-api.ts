import {ControllerFactory} from "../src/json-rest/controller-factory";
import * as express from 'express';

describe('simple use case', function () {
    class Service {
        async add(a, b) {
            return a + b;
        }
    }

    let ServiceController = ControllerFactory.create(Service);
    let service = new Service();
    let app = express();
    let controller = new ServiceController(service, app);

    let client = new
});