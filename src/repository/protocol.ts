export interface IRepository<R, T> {
    add(item: R): Promise<T>
}