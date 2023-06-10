import {
  IsDate,
  IsDecimal,
  IsInt,
  IsJSON,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsOptional,
  IsString,
  Min,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  p_name: string;

  @IsDecimal()
  p_price: number;

  @IsString()
  @IsNotEmpty()
  p_desc: string;

  @IsJSON()
  thumbnails: JSON;

  @IsString()
  @IsNotEmpty()
  cover: string;

  @IsString()
  @IsNotEmpty()
  status: string;

  @IsDate()
  @IsOptional()
  createdAt: Date;

  @IsDate()
  @IsOptional()
  updatedAt: Date;

  @IsDate()
  @IsOptional()
  deletedAt: Date;

  @IsInt()
  @Min(1)
  CategoryId: number;
}
