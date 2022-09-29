import { UserService } from "../../services/user/implementation";
import { UserDTO } from "../entities/user.entity";

const resolvers = {
  Query: {
    users: () => {
      const userService = new UserService();
      return userService.getAllUsers();
    },
  },
  Mutation: {
    createUser: async (_: any, input: any) => {
      const userDTO = input.user as UserDTO;
      const userService = new UserService();
      return await userService.add(userDTO);
    },
  },
};
export { resolvers };
