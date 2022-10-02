import {Task} from "@prisma/client";

export interface UserDTO {
  name: string;
  email: string;
  password: string;
}
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  tasks?: Task[]
}
