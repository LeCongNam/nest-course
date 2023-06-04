import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class GetUserDto {
  @IsNumber()
  id: number;

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
  password: string;

  @IsNumber()
  @IsOptional()
  @IsNotEmpty()
  @Type(() => Number)
  role: string;

  @IsOptional()
  @IsBoolean()
  deleted: boolean;
}
