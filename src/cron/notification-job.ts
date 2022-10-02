import { TaskRepository } from "../repository/task-repository";
import schedule from "node-schedule";

const job = schedule.scheduleJob("* * * * *", async function () {
  const taskRepository = new TaskRepository();
  await taskRepository.findAll();
  console.log("The answer to life, the universe, and everything!");
});

const sendEmail = async () => {
  const taskRepository = new TaskRepository();
  const tasks = await taskRepository.findAll();
  if (!tasks) return;
};

sendEmail().then((data) => {
  console.log(data);
});
