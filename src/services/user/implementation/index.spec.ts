import { UserService } from ".";

const makeSut = () => {
  const sut = new UserService();
  return {
    sut,
  };
};
describe("Test UserServiceClass", () => {
  it("should validate w", () => {
    expect(1).toBe(1);
  });
});
