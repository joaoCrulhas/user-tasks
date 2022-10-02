import { IRepository } from "./protocol";
import { User, UserDTO } from "../api/entities/user.entity";
import { PrismaClient } from "@prisma/client";
import { PrismaSingleton } from "../helpers/prisma-singleton";

export class UserRepository implements IRepository<UserDTO, User> {
  private userRepository: PrismaClient;
  constructor() {
    this.userRepository = PrismaSingleton.getInstance();
  }
  async findOne(entityId: number): Promise<User | null> {
    const user = await this.userRepository.user.findFirst({
      include: {
        tasks: {
          include: {
            task: true,
          },
        },
      },
      where: {
        id: entityId,
      },
    });
    if (!user) {
      return null;
    }
    const tasks = user.tasks.map((element) => element.task);
    return {
      ...user,
      tasks,
    };
  }

  async add(item: UserDTO): Promise<User> {
    try {
      return await this.userRepository.user.create({
        data: {
          email: item.email,
          password: item.password,
          name: item.name,
        },
      });
    } catch (e: any) {
      throw new Error(`Error creating user: ${e.message}`);
    }
  }

  async findAll(): Promise<User[] | null> {
    try {
      const allUsers = await this.userRepository.user.findMany({
        include: {
          tasks: {
            include: {
              task: true,
            },
          },
        },
      });
      if (!allUsers) {
        return null;
      }
      const response = allUsers.map((user) => {
        const tasks = user.tasks.map((task) => {
          return task.task;
        });
        return {
          ...user,
          tasks,
        };
      });
      return response;
    } catch (e: any) {
      throw new Error(`Error findAllUsers: ${e.message}`);
    }
  }
}
