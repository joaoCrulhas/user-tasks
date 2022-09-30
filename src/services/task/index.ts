import { PrismaClient, Task } from "@prisma/client";
import { TaskDTO } from "../../api/entities/task.entity";
import { IService } from "../protocol";
const prisma = new PrismaClient();

export class TaskService implements IService<Task, TaskDTO> {
  async add(payload: TaskDTO): Promise<Task> {
    console.log(`Payload ${JSON.stringify(payload)}`);
    const task = await prisma.task.create({
      data: {
        description: payload.description,
        name: payload.name,
        recurrence: payload.recurrence,
        endDate: payload.endDate,
      },
    });
    return task;
  }
  getAll(): Promise<Task[]> {
    throw new Error("Method not implemented.");
  }
}
