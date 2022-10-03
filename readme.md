# Getting started

- This project is a GQL API that allows you to manage your sustainability inside your company, managing the sustainable tasks.

- You're able to add users and create tasks attaching this to a list of customers.

- You're able to get all tasks and who is responsible to do or get specific content about a task.

- You're able to get all users and the tasks attached to him .

## Installation

- Should install docker on your machine.

- After installing docker, run the command

```bash
docker-compose up -d
```

- This command will deploy two containers one for the application and another one to MySQL.

## Usage

- To use open in your browser the address http://localhost:4000/ this will redirect you to apollo playground where you can do queries and mutations.

## ToDo

- There are some points that could be improved, about the notification an interface was created but should implement a real 3rd part integration, for example, a Twilio to notify the users.
