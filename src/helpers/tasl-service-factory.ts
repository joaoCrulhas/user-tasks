import { ServiceCreator } from "./service-creator"
import {IService} from "../services/protocol";
import {Task, TaskDTO} from "../api/entities/task.entity";
import {TaskRepository} from "../repository/task-repository";
import {TaskService} from "../services/task";

export class TaskServiceFactory extends ServiceCreator<Task, TaskDTO> {
    factoryMethod(): IService<Task, TaskDTO> {
        const taskRepository = new TaskRepository();
        const taskService = new TaskService(taskRepository)
        return taskService;
    }
}