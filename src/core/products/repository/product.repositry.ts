import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/prisma/prisma.service';
import { BaseRepository } from 'src/shared/repository/base.repository';

@Injectable()
export class ProductRepository extends BaseRepository {
  constructor(prisma: PrismaService) {
    super(ProductRepository, prisma);
  }
}
