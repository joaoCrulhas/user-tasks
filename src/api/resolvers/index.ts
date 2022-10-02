import { TaskDTO } from "../entities/task.entity";
import { GraphQLScalarType } from "graphql";
import { UserServiceFactory } from "../../helpers/user-service-factory";
import { TaskServiceFactory } from "../../helpers/tasl-service-factory";

interface InputTask {
  usersId: number[];
  task: TaskDTO;
}
interface InputUser {
  user: {
    email: string;
    name: string;
    password: string;
  };
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
    users: async (_: undefined, input?: QueryInput) => {
      const userService = new UserServiceFactory().factoryMethod();
      const id = input?.id;
      return await userService.get(id);
    },
    tasks: async (_: undefined, input?: QueryInput) => {
      console.log(_, 1);
      const id = input?.id;
      const taskService = new TaskServiceFactory().factoryMethod();
      return await taskService.get(id);
    },
  },
  Mutation: {
    createUser: async (_: undefined, input: InputUser) => {
      const userService = new UserServiceFactory().factoryMethod();
      return await userService.add({
        email: input.user.email,
        name: input.user.name,
        password: input.user.password,
      });
    },
    createTask: async (_: undefined, { task, usersId }: InputTask) => {
      const taskService = new TaskServiceFactory().factoryMethod();
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
