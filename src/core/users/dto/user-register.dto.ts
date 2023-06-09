import { Exclude, Expose, Type, plainToInstance } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class UserRegisterDto {
  @IsNumber()
  @IsOptional()
  @Expose()
  id: string;

  @IsString()
  @IsNotEmpty()
  @Expose()
  username: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
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
  @IsNotEmpty()
  password: string;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  roleId: number;

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

  @IsBoolean()
  @IsOptional()
  @Expose()
  isInactive: boolean;

  public static plainToClass<T>(this: new (...args: any[]) => T, obj: T) {
    return plainToInstance(this, obj, { excludeExtraneousValues: true });
  }
}
