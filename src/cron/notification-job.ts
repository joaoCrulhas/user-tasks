import { TaskRepository } from "../repository/task-repository";
import schedule from "node-schedule";
import { EmailNotification } from "../services/notification/email-notification";

schedule.scheduleJob("0 0 * * *", async function () {
  const taskRepository = new TaskRepository();
  await taskRepository.findAll();
  await sendEmail();
  console.log("The answer to life, the universe, and everything!");
});

const sendEmail = async () => {
  const taskRepository = new TaskRepository();
  const tasks = await taskRepository.findAll({
    isRunningTask: true,
  });
  if (!tasks) return;
  const emailNotification = new EmailNotification();
  tasks.forEach(async (task) => {
    if (task.users) {
      await emailNotification.send(task.users, task);
      return;
    }
  });
};
