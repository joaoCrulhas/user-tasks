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
    endDate: Date
  }

  type Task {
    id: Int
    name: String
    description: String
    recurrence: Int
    endDate: Date
    createdAt: Date
    updatedAt: Date
  }

  type Mutation {
    createUser(user: UserInput): User
    createTask(usersId: [Int!], task: TaskInput): Task
  }

  type Query {
    users(id: Int): [User]
    tasks(id: Int): [Task]
  }
`;

export { typeDefs };
