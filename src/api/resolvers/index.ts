import { TaskService } from "../../services/task";
import { UserService } from "../../services/user/implementation";
import { TaskDTO } from "../entities/task.entity";
import { UserDTO } from "../entities/user.entity";
interface InputTask {
  userId: number;
  task: TaskDTO;
}
const resolvers = {
  Query: {
    users: () => {
      const userService = new UserService();
      return userService.getAll();
    },
  },
  Mutation: {
    createUser: async (_: any, input: any) => {
      const userDTO = input.user as UserDTO;
      const userService = new UserService();
      return await userService.add(userDTO);
    },
    createTask: async (_: any, { task, userId }: InputTask) => {
      const taskService = new TaskService();
      return await taskService.add(task);
    },
  },
};
export { resolvers };
