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
