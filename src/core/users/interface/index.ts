import { type } from 'os';

export interface FindOneUser {
  username?: string;
  id?: string;
  email?: string;
  password?: string;
  roleId?: number;
  deleted?: boolean;
}

interface Filter {
  _skip?: number;
  _take?: number;
  _sort?: 'asc' | 'desc';
}

export type IRequestUser = Partial<FindOneUser & Filter>;
