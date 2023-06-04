import { Type } from 'class-transformer';
import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsString,
  Max,
  Min,
} from 'class-validator';

enum Sort {
  asc = 'asc',
  desc = 'desc',
}

export class BaseFilter {
  @IsInt()
  @Min(0)
  @Type(() => Number)
  _skip: number;

  @IsInt()
  @Min(0)
  @Max(100)
  @Type(() => Number)
  _take: number;

  @IsString()
  @IsNotEmpty()
  @IsEnum(Sort)
  _sort: 'asc' | 'desc';
}
