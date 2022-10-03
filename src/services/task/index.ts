import { Task, TaskDTO } from "../../api/entities/task.entity";
import { IService } from "../protocol";
import { IRepository } from "../../repository/protocol";
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
    });
  }
  async get(entityId?: number): Promise<Task[] | null> {
    if (entityId) {
      const task = await this.taskRepository.findOne(entityId);
      if (!task) {
        return null;
      }
      return [
        {
          name: task.name,
          recurrence: task.recurrence,
          startDate: task.startDate,
          endDate: task.endDate,
          categoryTask: task.categoryTask,
          description: task.description,
          createdAt: task.createdAt,
          updatedAt: task.updatedAt,
          id: task.id,
          users: task.users,
        },
      ];
    }
    return this.taskRepository.findAll();
  }
}
