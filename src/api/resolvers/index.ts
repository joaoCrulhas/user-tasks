import { User } from "@prisma/client";
import { UserService } from "../../services/user/implementation";
import { UserDTO } from "../entities/user.entity";

const books = [
  {
    title: "The Awakening",
    author: "Kate Chopin",
  },
  {
    title: "City of Glass",
    author: "Paul Auster",
  },
];

const resolvers = {
  Query: {
    users: () => {
      return books;
    },
  },
  Mutation: {
    createUser: async (_: any, input: any) => {
      const userDTO = input.user as UserDTO;
      const userService = new UserService();
      const response = await userService.add(userDTO);
      return response;
    },
  },
};
export { resolvers };
