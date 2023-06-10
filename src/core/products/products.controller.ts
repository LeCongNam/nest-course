import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Res,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Response } from 'express';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ListProductDto } from './dto/list-product.dto';
import { BaseController } from 'src/shared/res/custom-response';
import { HTTP_MESSAGE_SUCCESS } from 'src/shared/constant';

@Controller('products')
export class ProductsController extends BaseController {
  constructor(private readonly productsService: ProductsService) {
    super();
  }

  @Post()
  public async create(
    @Res() res: Response,
    @Body() createProductDto: CreateProductDto,
  ) {
    const data = await this.productsService.create(createProductDto);
    this.customResponse(res, data, {
      message: HTTP_MESSAGE_SUCCESS.CREATE_PRODUCT_SUCCESS,
    });
  }

  @Get()
  @UsePipes(new ValidationPipe())
  public async findAll(
    @Res() res: Response,
    @Query() products: ListProductDto,
  ) {
    const [data, pagination] = await this.productsService.findAll(products);
    this.customResponse(res, data, {
      page: +products._skip,
      total: pagination.total,
    });
  }

  @Get(':id')
  public async findOne(@Res() res: Response, @Param('id') id: string) {
    const data = await this.productsService.findOne(id);
    this.customResponse(res, data);
  }

  @Patch(':id')
  public update(
    @Param('id') id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  public remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }
}
