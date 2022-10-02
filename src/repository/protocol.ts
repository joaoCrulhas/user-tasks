export interface IRepository<R, T> {
    add(item: R): Promise<T>;
    findOne(id: number): Promise<T | null>;
    findAll(): Promise<T[] | null>;
}