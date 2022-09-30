import { UserDTO, User } from "../../../api/entities/user.entity";
import { PrismaClient } from "@prisma/client";
import { IService } from "../../protocol";
const prisma = new PrismaClient();

export class UserService implements IService<User, UserDTO> {
  async add({ email, password, name }: UserDTO): Promise<User> {
    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });
    return {
      id: user.id,
      email: user.email,
      name: user.name,
    };
  }

  async getAll(): Promise<User[]> {
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
  }
}
