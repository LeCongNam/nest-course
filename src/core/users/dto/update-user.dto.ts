import { Expose, Type } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { RoleEntity } from '../entity/role.entity';

export class UpdateUser {
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
  @IsOptional()
  @IsNotEmpty()
  password: string;

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
}
