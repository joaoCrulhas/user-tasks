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
        endDate: payload.endDate,
        users: {
          create: payload.usersId.map((element) => {
            return {
              userId: element,
            };
          }),
        },
      },
    });
  }
  async get(entityId?: number): Promise<Task[]> {
    console.log(1, typeof entityId);
    if (entityId) {
      return await prisma.task.findMany({
        where: {
          id: entityId,
        },
      });
    }
    return await prisma.task.findMany();
  }
}
