export interface IService<T, R> {
  add(payload: R): Promise<T>;
  get(entityId?: number): Promise<T[] | T | null>;
}
