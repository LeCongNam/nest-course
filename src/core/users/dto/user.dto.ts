import { Expose, plainToInstance } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

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
  @IsOptional()
  roleId?: number;

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
  constructor(data: any) {
    if (data) {
      this.id = data.id;
      this.address = data.address;
      this.email = data.email;
      this.lastName = data.lastName;
      this.firstName = data.firstName;
      this.phone = data.phone;
      this.createdAt = data.createdAt;
      this.updatedAt = data.updatedAt;
      this.userName = data.userName;
      this.roleId = data.roleId;
    }
  }
}
