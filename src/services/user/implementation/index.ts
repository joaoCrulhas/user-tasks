import { UserDTO, User } from "../../../api/entities/user.entity";
import { PrismaClient } from "@prisma/client";
import { IService } from "../../protocol";
import {UserRepository} from "../../../repository/user-repository";
import {IRepository} from "../../../repository/protocol";
const prisma = new PrismaClient();

export class UserService implements IService<User, UserDTO> {
  constructor(private readonly userRepository: IRepository<UserDTO, User>) {}
  async add({ email, password, name }: UserDTO): Promise<User> {
    return  await this.userRepository.add({ email, password, name })
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
