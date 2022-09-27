import { User, UserDTO } from "../../../api/entities/user.entity";

export interface IUserService {
  add(user: UserDTO): User;
}
