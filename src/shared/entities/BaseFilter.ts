import { Type } from 'class-transformer';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
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
  // @IsEnum(Sort)
  @IsOptional()
  _sort: string;
}
