import { User, UserDTO } from "../../api/entities/user.entity";
import { IService } from "../protocol";
import { IRepository } from "../../repository/protocol";
export class UserService implements IService<User, UserDTO> {
  constructor(private readonly userRepository: IRepository<UserDTO, User>) {}
  async add({ email, password, name }: UserDTO): Promise<User> {
    return await this.userRepository.add({ email, password, name });
  }

  async get(entityId?: number): Promise<User[] | null> {
    if (entityId) {
      const user = await this.userRepository.findOne(entityId);
      if (!user) {
        return null;
      }
      return [
        {
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
          email: user.email,
          name: user.name,
          id: user.id,
          tasks: user.tasks,
        },
      ];
    }
    return await this.userRepository.findAll();
  }
}
