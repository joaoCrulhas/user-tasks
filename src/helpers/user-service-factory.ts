import { ServiceCreator } from "./service-creator"
import {User, UserDTO} from "../api/entities/user.entity";
import {IService} from "../services/protocol";
import {UserRepository} from "../repository/user-repository";
import {UserService} from "../services/user";

export class UserServiceFactory extends ServiceCreator<User, UserDTO> {
    factoryMethod(): IService<User, UserDTO> {
        const userRepository = new UserRepository();
        const userService = new UserService(userRepository);
        return userService;
    }
}