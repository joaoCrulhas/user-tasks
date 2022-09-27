import { gql } from "apollo-server";

const typeDefs = gql`
  type User {
    id: Int
    email: String
    name: String
  }

  input UserInput {
    email: String
    name: String
    password: String
  }

  type Mutation {
    createUser(user: UserInput): User
  }

  type Query {
    users: [User]
  }
`;

export { typeDefs };
