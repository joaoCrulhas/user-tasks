import {IRepository} from "./protocol";
import {User, UserDTO} from "../api/entities/user.entity";
import {PrismaClient, } from "@prisma/client";

export class UserRepository implements IRepository<UserDTO, User> {
    private userRepository: PrismaClient;
    constructor() {
        this.userRepository = new PrismaClient();
    }
    async add(item: UserDTO): Promise<User> {
        try {
            return await this.userRepository.user.create({
                data: {
                    email: item.email,
                    password: item.password,
                    name: item.name,
                }
            })
        } catch (e: any) {
            throw new Error(`Error creating user: ${e.message}`);
        }
    }
}