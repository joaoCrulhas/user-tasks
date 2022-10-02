import { IRepository } from "./protocol";
import { Task, TaskDTO } from "../api/entities/task.entity";
import { PrismaClient } from "@prisma/client";
import { PrismaSingleton } from "../helpers/prisma-singleton";
export interface TaskCondition {
  isRunningTask?: boolean;
  //   hasUsersAssigned?: boolean; @TODO
}
export class TaskRepository implements IRepository<TaskDTO, Task> {
  private taskRepository: PrismaClient;
  constructor() {
    this.taskRepository = PrismaSingleton.getInstance();
  }
  async add(item: TaskDTO): Promise<Task> {
    const { name, recurrence, startDate, endDate, categoryTask, description } =
      item;
    const task = await this.taskRepository.task.create({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
      data: {
        name,
        recurrence,
        startDate,
        endDate,
        categoryTask,
        description,
        users: {
          create: item.usersId.map((element) => {
            return {
              userId: element,
            };
          }),
        },
      },
    });
    const users = task.users.map(({ user }) => user);
    return {
      createdAt: task.createdAt,
      categoryTask: task.categoryTask,
      description: task.description,
      name: task.name,
      endDate: task.endDate,
      updatedAt: task.updatedAt,
      recurrence: task.recurrence,
      startDate: task.startDate,
      id: task.id,
      users,
    };
  }

  private buildWhereQuery(conditions: TaskCondition) {
    let where = {};
    if (conditions.isRunningTask) {
      where = {
        ...where,
        endDate: { gte: new Date() },
      };
    }
    return where;
  }

  async findAll(conditions?: TaskCondition): Promise<Task[] | null> {
    const query = !conditions ? {} : this.buildWhereQuery(conditions);
    const allTasks = await this.taskRepository.task.findMany({
      where: { ...query },
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

  async findOne(id: number): Promise<Task | null> {
    const response = await this.taskRepository.task.findFirst({
      include: {
        users: {
          include: {
            user: true,
          },
        },
      },
      where: {
        id,
      },
    });
    if (!response) {
      return null;
    }
    const users = response.users.map(({ user }) => user);
    return {
      id: response.id,
      startDate: response.startDate,
      endDate: response.endDate,
      updatedAt: response.updatedAt,
      name: response.name,
      categoryTask: response.categoryTask,
      createdAt: response.createdAt,
      description: response.description,
      recurrence: response.recurrence,
      users,
    };
  }
}
