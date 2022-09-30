import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

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

  input TaskInput {
    description: String
    name: String
    recurrence: Int
    endDate: String
  }

  type Task {
    id: Int
    name: String
    description: String
    recurrence: Int
    endDate: String
    createdAt: String
    updatedAt: String
  }

  type Mutation {
    createUser(user: UserInput): User
    createTask(userId: [Int!], task: TaskInput): Task
  }

  type Query {
    users: [User]
  }
`;

export { typeDefs };
