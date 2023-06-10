import { IFilterGetList, IRepository } from '../interface';
import { PrismaService } from '../prisma/prisma.service';
import { TClass } from '../types/global';

export class BaseRepository implements IRepository {
  private ORM: PrismaService;
  private table: string;

  constructor(repositoryName: TClass, prisma: PrismaService) {
    const repositoryCurrentName = repositoryName.name
      .replace('Repository', '')
      .toLowerCase();
    this.table = repositoryCurrentName;
    this.ORM = prisma;
  }

  public async createMany<T>(data: T[]): Promise<any[]> {
    const createMany = await this.ORM[this.table].createMany({
      data,
      skipDuplicates: true,
    });
    return createMany;
  }

  public create<T extends object>(data: T): Promise<T> {
    return this.ORM[this.table].create({
      data,
    });
  }

  public getOneById<T>(id: T) {
    return this.ORM[this.table].findFirst({
      where: {
        id,
      },
    });
  }

  public getOne<T>(filter: T) {
    return this.ORM[this.table].findFirst({
      where: filter,
    });
  }

  public async getList(_filter: IFilterGetList) {
    const { _sort, _skip = 0, _take = 10, ...filterOption } = _filter;

    const data = await this.ORM[this.table].findMany({
      where: filterOption,
      skip: Number(_skip) * Number(_take) || 0,
      take: +_take,
      orderBy: _sort,
    });

    const count = await this.ORM[this.table].aggregate({
      where: filterOption,
      skip: +_skip,
      take: +_take,
      orderBy: _sort,
      _count: {
        id: true,
      },
    });

    const total = await this.ORM[this.table].aggregate({
      _count: {
        id: true,
      },
    });

    return Promise.all([
      data,
      {
        count: count?._count?.id || 0,
        total: total?._count?.id,
      },
    ]);
  }

  public async update<T extends string | number, V>(id: T, data: V) {
    await this.ORM[this.table].update({
      where: id,
      data,
    });
    return this.ORM[this.table].findFirst({ id });
  }
  public async delete<T>(id: T) {
    await this.ORM[this.table].delete({ id });
    return this.ORM[this.table].findFirst({ id });
  }
}
