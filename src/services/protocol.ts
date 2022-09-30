export interface IService<T, R> {
  add(payload: R): Promise<T>;
  getAll(): Promise<T[]>;
}
