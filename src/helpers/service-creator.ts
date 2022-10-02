import {IService} from "../services/protocol";

export abstract class ServiceCreator<T, R> {
    public abstract factoryMethod(): IService<T, R>;
}
