import { Optional } from '@nestjs/common';
import { Type } from 'class-transformer';
import {
  IsUUID,
  IsString,
  IsNotEmpty,
  IsNumber,
  IsBoolean,
  IsOptional,
} from 'class-validator';

export class GetUserDto {
  @IsUUID()
  @IsOptional()
  @Optional()
  id: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Optional()
  password: string;

  @IsNumber()
  @Optional()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  role: number;

  @IsBoolean()
  @Optional()
  deleted: boolean;
}
