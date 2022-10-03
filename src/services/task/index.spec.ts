import { TaskService } from ".";
import { Recurrence, Task, TaskDTO } from "../../api/entities/task.entity";
import { IRepository } from "../../repository/protocol";
import { IService } from "../protocol";
import { TaskRepository } from "../../repository/task-repository";
import { faker } from "@faker-js/faker";
import moment from "moment";

const makeSut = (): {
  sut: IService<Task, TaskDTO>;
  repositoryStub: IRepository<TaskDTO, Task>;
} => {
  const repositoryStub = new TaskRepository();
  const taskService = new TaskService(repositoryStub);
  return {
    sut: taskService,
    repositoryStub,
  };
};
describe("TaskService", () => {
  it("Should call the repository findOne at least once", async () => {
    const { sut, repositoryStub } = makeSut();
    const id = faker.datatype.number();
    const spy = jest.spyOn(repositoryStub, "findOne").mockReturnValueOnce(
      Promise.resolve({
        id: id,
        startDate: moment().toDate(),
        endDate: moment().add(6, "days").toDate(),
        name: faker.name.fullName(),
        description: "Test Description",
        categoryTask: "CategoryTask",
        recurrence: Recurrence.biweekly,
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            updatedAt: new Date(),
            email: faker.internet.email(),
            createdAt: new Date(),
          },
        ],
      })
    );
    await sut.get(1);
    expect(spy).toHaveBeenCalled();
  });
  it("Should call the repository with correct arguments", async () => {
    const { sut, repositoryStub } = makeSut();
    const id = faker.datatype.number();
    const spy = jest.spyOn(repositoryStub, "findOne").mockReturnValueOnce(
      Promise.resolve({
        id: id,
        startDate: moment().toDate(),
        endDate: moment().add(6, "days").toDate(),
        name: faker.name.fullName(),
        description: "Test Description",
        categoryTask: "CategoryTask",
        recurrence: Recurrence.biweekly,
        createdAt: new Date(),
        updatedAt: new Date(),
        users: [
          {
            id: faker.datatype.number(),
            name: faker.name.fullName(),
            updatedAt: new Date(),
            email: faker.internet.email(),
            createdAt: new Date(),
          },
        ],
      })
    );
    await sut.get(1);
    expect(spy).toHaveBeenCalledWith(1);
  });

  it("should execute findAll() if the id is not provided", async () => {
    const { sut, repositoryStub } = makeSut();
    const id = faker.datatype.number();
    const spy = jest.spyOn(repositoryStub, "findAll").mockReturnValueOnce(
      Promise.resolve([
        {
          id: id,
          startDate: moment().toDate(),
          endDate: moment().add(6, "days").toDate(),
          name: faker.name.fullName(),
          description: "Test Description",
          categoryTask: "CategoryTask",
          recurrence: Recurrence.biweekly,
          createdAt: new Date(),
          updatedAt: new Date(),
          users: [
            {
              id: faker.datatype.number(),
              name: faker.name.fullName(),
              updatedAt: new Date(),
              email: faker.internet.email(),
              createdAt: new Date(),
            },
          ],
        },
      ])
    );
    await sut.get();
    expect(spy).toBeCalled();
  });
});
