import { TaskService } from "../../services/task";
import { UserService } from "../../services/user/implementation";
import { TaskDTO } from "../entities/task.entity";
import { UserDTO } from "../entities/user.entity";
import { GraphQLScalarType } from "graphql";

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
    return value.getTime();
  },
});
interface TaskQueryInput {
  id?: number;
}
const resolvers = {
  Date: dateScalar,
  Query: {
    users: () => {
      const userService = new UserService();
      return userService.get();
    },
    tasks: (_: any, input?: TaskQueryInput) => {
      const id = input!.id;
      const taskService = new TaskService();
      return taskService.get(id);
    },
  },
  Mutation: {
    createUser: async (_: any, input: any) => {
      const userDTO = input.user as UserDTO;
      const userService = new UserService();
      return await userService.add(userDTO);
    },
    createTask: async (_: any, { task, usersId }: InputTask) => {
      const taskService = new TaskService();
      return await taskService.add({
        description: task.description,
        endDate: task.endDate,
        name: task.name,
        recurrence: task.recurrence,
        usersId,
      });
    },
  },
};
export { resolvers };
