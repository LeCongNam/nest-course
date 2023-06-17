import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseFilter } from 'src/shared/entities/BaseFilter';
import { RoleEntity } from '../entity/role.entity';

export class AllUser extends BaseFilter {
  constructor() {
    super();
  }
  @IsNumber()
  @IsOptional()
  @Expose()
  id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Expose()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Expose()
  address: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsOptional()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Expose()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Expose()
  lastName: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Exclude({ toClassOnly: true })
  password: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  roleId: RoleEntity;

  @IsBoolean()
  @IsOptional()
  @Expose()
  deleted: boolean;

  @IsOptional()
  @Expose()
  createdAt: Date;

  @IsOptional()
  @Expose()
  updatedAt: Date;

  @IsOptional()
  @Expose()
  deletedAt: Date;

  @IsOptional()
  @IsBoolean()
  @Expose()
  isDelete: boolean;

  // @IsBoolean()
  // @IsOptional()
  // @Expose()
  // isInactive: boolean;

  public static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToInstance(this, obj, { excludeExtraneousValues: true });
  }
}
