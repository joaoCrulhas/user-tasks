import {INotification} from "./protocol";
import {User} from "../../api/entities/user.entity";
import {Task} from "../../api/entities/task.entity";
const nodemailer = require('nodemailer');

export class EmailNotification implements INotification {
    send(user: User, task: Task): Promise<boolean> {
        console.log(`Sending a email to ${user.name} to do task ${task.description}`);
        return Promise.resolve(true);
    }
}
