import { User } from "../../api/entities/user.entity";
import { Task } from "../../api/entities/task.entity";

export interface INotification {
  send(user: User[], task: Task): Promise<boolean>;
}
