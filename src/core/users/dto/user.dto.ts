import { Exclude, Expose, plainToInstance } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEntity } from '../entity/role.entity';
import { Role } from '../constant';

export class UserDto {
  @IsNumber()
  @IsOptional()
  @Expose()
  id?: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  userName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  @IsOptional()
  phone: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Expose()
  address: string;

  @IsEmail()
  @Expose()
  email: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  firstName: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  lastName: string;

  @IsString()
  // @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsEnum({
    default: Role.MEMBER,
  })
  @IsOptional()
  roleId: RoleEntity;

  @IsOptional()
  @Expose()
  createdAt: Date;

  @IsOptional()
  @Expose()
  updatedAt: Date;

  @IsOptional()
  @Expose()
  deletedAt: Date;

  public static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToInstance(this, obj, { excludeExtraneousValues: true });
  }
}
