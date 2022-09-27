export interface UserDTO {
  name: string;
  email: string;
  password: string;
}
export interface User extends UserDTO {
  id: string;
}
