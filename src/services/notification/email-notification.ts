import { INotification } from "./protocol";
import { User } from "../../api/entities/user.entity";
import { Task } from "../../api/entities/task.entity";

export class EmailNotification implements INotification {
  send(user: User[], task: Task): Promise<boolean> {
    console.log(
      `Sending a email to users ${JSON.stringify(user)} to do task ${
        task.description
      }`
    );
    return Promise.resolve(true);
  }
}
