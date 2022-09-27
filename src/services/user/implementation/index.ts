import { UserDTO, User } from "../../../api/entities/user.entity";
import { IUserService } from "../protocols";

export class UserService implements IUserService {
  add(user: UserDTO): User {
    throw new Error("Method not implemented.");
  }
}
