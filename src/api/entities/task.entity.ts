import {User} from "./user.entity";

export interface TaskDTO {
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  recurrence: Recurrence;
  usersId: number[];
  categoryTask: string;
}

export interface Task {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  description: string;
  recurrence: Recurrence;
  categoryTask: string;
  createdAt: Date;
  updatedAt: Date;
  users?: User[];
}

export enum Recurrence {
  biweekly = 1,
  monthly = 2,
  quarterly = 3,
  yearly = 4,
}
