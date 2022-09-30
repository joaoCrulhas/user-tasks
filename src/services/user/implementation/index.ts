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

  async get(entityId?: number): Promise<User[]> {
    if (entityId) {
      const user = await prisma.user.findMany({
        where: {
          id: entityId,
        },
        include: {
          tasks: {
            include: {
              task: true,
            },
          },
        },
      });
      return user.map((u) => {
        return {
          ...u,
          tasks: u.tasks.map((t) => {
            return t.task;
          }),
        };
      });
    }
    return await prisma.user.findMany();
  }
}
