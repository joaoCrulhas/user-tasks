import { TaskService } from "../../services/task";
import { UserService } from "../../services/user/implementation";
import { TaskDTO } from "../entities/task.entity";
import { UserDTO } from "../entities/user.entity";
import { GraphQLScalarType } from "graphql";
import {UserRepository} from "../../repository/user-repository";
import {TaskRepository} from "../../repository/task-repository";

interface InputTask {
  usersId: number[];
  task: TaskDTO;
}

const dateScalar = new GraphQLScalarType({
  name: "Date",
  description: "Scalar type to datetime",
  parseValue(inputValue) {
    const str = inputValue as string;
    return new Date(str);
  },
  serialize(outputValue) {
    const value = outputValue as Date;
    return value.toISOString().split("T")[0];
  },
});
interface QueryInput {
  id?: number;
}
const resolvers = {
  Date: dateScalar,
  Query: {
    users: async (_: any, input?: QueryInput) => {
      const id = input!.id;
      const userRepository = new UserRepository();
      const userService = new UserService(userRepository);
      return await userService.get(id);
    },
    tasks: async (_: any, input?: QueryInput) => {
      const id = input!.id;
      const taskRepository = new TaskRepository();
      const taskService = new TaskService(taskRepository);
      return await taskService.get(id);
    },
  },
  Mutation: {
    createUser: async (_: any, input: any) => {
      const userRepository = new UserRepository();
      const userDTO = input.user as UserDTO;
      const userService = new UserService(userRepository);
      return await userService.add(userDTO);
    },
    createTask: async (_: any, { task, usersId }: InputTask) => {
      const taskRepository = new TaskRepository();
      const taskService = new TaskService(taskRepository);
      return await taskService.add({
        description: task.description,
        startDate: task.startDate,
        endDate: task.endDate,
        name: task.name,
        recurrence: task.recurrence,
        usersId,
        categoryTask: task.categoryTask,
      });
    },
  },
};
export { resolvers };
