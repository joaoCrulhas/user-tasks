import {IRepository} from "./protocol";
import {Task, TaskDTO} from "../api/entities/task.entity";
import { PrismaClient} from "@prisma/client";

export class TaskRepository implements IRepository<TaskDTO, Task> {
    private taskRepository: PrismaClient;
    constructor() {
        this.taskRepository = new PrismaClient();
    }
    async add(item: TaskDTO): Promise<Task> {
        const { name, recurrence,startDate,endDate,categoryTask,description } = item;
        const task = await this.taskRepository.task.create({
            include: {
                users: {
                    include: {
                        user: true,
                    }
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
                }
            }
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

    findAll(): Promise<Task[] | null> {
        throw new Error(`Task 1`);
    }

    findOne(id: number): Promise<Task | null> {
        throw new Error(`Task 1`);
    }

}