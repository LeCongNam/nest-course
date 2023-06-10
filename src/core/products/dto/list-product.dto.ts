import {
  IsDate,
  IsDecimal,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
} from 'class-validator';
import { BaseFilter } from 'src/shared/entities/BaseFilter';

export class ListProductDto extends BaseFilter {
  @IsString()
  @IsOptional()
  @IsNotEmpty()
  p_name: string;

  @IsDecimal()
  @IsOptional()
  p_price: number;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  p_desc: string;

  @IsOptional()
  @IsObject()
  thumbnails: object;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  cover: string;

  @IsString()
  @IsOptional()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date;
}
