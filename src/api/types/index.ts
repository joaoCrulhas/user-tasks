import { gql } from "apollo-server";

const typeDefs = gql`
  scalar Date

  enum CategoryTask {
    Environment
    Social
    Governance
  }

  type User {
    id: Int
    email: String
    name: String
    tasks: [Task]
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
    startDate: Date
    endDate: Date
    categoryTask: CategoryTask!
  }

  type Task {
    id: Int
    name: String
    description: String
    recurrence: Int
    startDate: Date
    endDate: Date
    createdAt: Date
    updatedAt: Date
    users: [User]
    categoryTask: String
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
