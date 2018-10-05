import {IControllable} from "./facade";
import {Express} from "express";
import e = require("express");

export interface IOptions {
}

export interface ControllerContructor<T> {
    new(instance: T, express: Express);
}

export class JsonRpcControllerFactory {
    static create<T>(constructor: IControllable<T>, options?: IOptions): ControllerContructor<T> {
        let className = constructor.name;
        let controllerName = className + 'Controller';

        let controllerConstructor = class {
            get instanceId() {
                return (this.instance as any).id || className;
            }

            constructor(protected instance: T, protected express: Express) {
                this.attachToServer();
            }

            private attachToServer() {
                this.express.post(`/${this.instanceId}/:method`,
                    e.json(),
                    async (req: e.Request, res: e.Response) => {
                        let method = req.params.method;
                        let args = req.body || [];
                        try {
                            let result = await this.instance[method](...args);
                            res.json(result);
                        } catch (err) {
                            res.status(500).json(err);
                        }
                    });
            }
        };

        Object.defineProperty(controllerConstructor, 'name', {value: controllerName});
        return controllerConstructor;
    }
}