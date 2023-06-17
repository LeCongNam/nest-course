import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { ProductRepository } from './repository/product.repositry';
import { ListProductDto } from './dto/list-product.dto';

@Injectable()
export class ProductsService {
  // constructor(private readonly _productRepository: ProductRepository) {}

  public async create(createProductDto: CreateProductDto) {
    // const productOld = await this._productRepository.getOne({
    //   p_name: createProductDto.p_name,
    // });
    // if (productOld)
    //   throw new HttpException(
    //     'Name of Product is Exits',
    //     HttpStatus.UNPROCESSABLE_ENTITY,
    //   );
    // return this._productRepository.create(createProductDto);
  }

  public findAll(products: ListProductDto) {
    // const { _sort, _skip = 0, _take = 10 } = products;
    // return this._productRepository.getList({
    //   ...products,
    //   _skip,
    //   _take,
    //   _sort: JSON.parse(_sort),
    // });
  }

  public async findOne(id: string) {
    // return this._productRepository.getOneById(id);
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
