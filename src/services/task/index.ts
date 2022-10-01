import { PrismaClient, Task } from "@prisma/client";
import { TaskDTO } from "../../api/entities/task.entity";
import { IService } from "../protocol";
const prisma = new PrismaClient();

export class TaskService implements IService<Task, TaskDTO> {
  async add(payload: TaskDTO): Promise<Task> {
    return await prisma.task.create({
      include: {
        users: true,
      },
      data: {
        description: payload.description,
        name: payload.name,
        recurrence: payload.recurrence,
        startDate: payload.startDate,
        endDate: payload.endDate,
        users: {
          create: payload.usersId.map((element) => {
            return {
              userId: element,
            };
          }),
        },
        categoryTask: payload.categoryTask,
      },
    });
  }
  async get(entityId?: number): Promise<Task[]> {
    if (entityId) {
      const response = await prisma.task.findMany({
        include: {
          users: {
            include: {
              user: true,
            },
          },
        },
        where: {
          id: entityId,
        },
      });
      return response.map((task) => {
        return {
          ...task,
          users: task.users.map((user) => {
            return user.user;
          }),
        };
      });
    }
    const allTasks = await prisma.task.findMany({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
    });
    return allTasks.map((task) => {
      return {
        ...task,
        users: task.users.map((user) => {
          return user.user;
        }),
      };
    });
  }
}
