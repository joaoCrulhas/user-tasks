import { TaskService } from "../../services/task";
import { UserService } from "../../services/user/implementation";
import { TaskDTO } from "../entities/task.entity";
import { UserDTO } from "../entities/user.entity";
import { GraphQLScalarSerializer, GraphQLScalarType, Kind } from "graphql";

interface InputTask {
  userId: number;
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

const resolvers = {
  Date: dateScalar,
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
