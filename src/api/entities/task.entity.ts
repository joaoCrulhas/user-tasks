export interface TaskDTO {
  name: string;
  endDate: Date;
  description: string;
  recurrence: Recurrence;
}

export interface Task extends TaskDTO {
  id: number;
  createdAt: Date;
  updatedAt: Date;
}
export enum Recurrence {
  biweekly = 1,
  monthly = 2,
  quarterly = 3,
  yearly = 4,
}
