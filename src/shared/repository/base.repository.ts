import { DataSource, Repository } from 'typeorm';
import { TClass } from '../types/global';

export class BaseRepository<T> extends Repository<T> {
  private _targetClass: TClass;
  constructor(targetClass: TClass, dataSource: DataSource) {
    super(targetClass, dataSource.createEntityManager());
    this._targetClass = targetClass;
  }
}
