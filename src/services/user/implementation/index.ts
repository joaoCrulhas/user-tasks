import { UserDTO, User } from "../../../api/entities/user.entity";
import { IUserService } from "../protocols";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export class UserService implements IUserService {
  async getAllUsers(): Promise<User[]> {
    const users = await prisma.user.findMany();
    console.log(users);
    return users;
  }

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
}
