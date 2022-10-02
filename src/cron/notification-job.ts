import { TaskRepository } from "../repository/task-repository";
import schedule from "node-schedule";
import { EmailNotification } from "../services/notification/email-notification";
import { Recurrence, Task } from "../api/entities/task.entity";
import moment from "moment";

schedule.scheduleJob("0 0 * * *", async function () {
  const taskRepository = new TaskRepository();
  await taskRepository.findAll();
  await sendEmail();
});

const shouldNotifyTask = (task: Task): boolean => {
  const { startDate, recurrence } = task;
  const today = moment();

  if (recurrence === Recurrence.biweekly) {
    const diff = today.diff(moment(startDate), "days");
    return diff % 15 === 0;
  }

  if (recurrence === Recurrence.monthly) {
    const diff = today.diff(moment(startDate), "month");
    return diff === 1;
  }

  if (recurrence === Recurrence.quarterly) {
    const diff = today.diff(moment(startDate), "quarter");
    return diff === 1;
  }

  if (recurrence === Recurrence.yearly) {
    const diff = today.diff(moment(startDate), "years");
    return diff === 1;
  }

  return false;
};
const sendEmail = async () => {
  const taskRepository = new TaskRepository();
  const tasks = await taskRepository.findAll({
    isRunningTask: true,
  });
  if (!tasks) return;
  const emailNotification = new EmailNotification();
  tasks.forEach(async (task) => {
    if (shouldNotifyTask(task)) {
      await emailNotification.send(task.users, task);
    }
  });
};

sendEmail().then((data) => {
  console.log(data);
});
