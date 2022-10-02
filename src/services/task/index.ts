import { Task, TaskDTO} from "../../api/entities/task.entity";
import {IService} from "../protocol";
import {IRepository} from "../../repository/protocol";
import {PrismaClient} from "@prisma/client";
const prisma = new PrismaClient();
export class TaskService implements IService<Task, TaskDTO> {
  constructor(private readonly taskRepository: IRepository<TaskDTO, Task>) {}
  async add(payload: TaskDTO): Promise<Task> {
    return await this.taskRepository.add({
      description: payload.description,
      startDate: payload.startDate,
      endDate: payload.endDate,
      name: payload.name,
      recurrence: payload.recurrence,
      usersId: payload.usersId,
      categoryTask: payload.categoryTask,
    })
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
