export interface filterOptions {
  _skip: number;
  _take: number;
  _sort: {
    [key: string]: 'asc' | 'desc';
  };
}

export interface IFilterAny {
  [key: string]: any;
}

export type IFilterGetList = Partial<filterOptions & IFilterAny>;

export interface IRepository {
  create<T extends object>(data: T);
  createMany<T>(data: T[]);
  getOneById<T extends number | string>(id: T);
  getOne<T>(filter: T);
  getList<T>(filter: IFilterGetList);
  update<T extends number | string, V, K>(id: T, data: V);
  delete<T extends number | string>(id: T);
}
