import { Module, OnModuleInit } from '@nestjs/common';
import { ElasticsearchModule } from '@nestjs/elasticsearch';
import { SearchService } from './service/search.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { readFileSync } from 'fs';
import path from 'path';
import { Provider } from './constant';

@Module({
  imports: [
    ElasticsearchModule.registerAsync({
      useFactory: async () => ({
        node: process.env.ELASTICSEARCH_NODE,
        maxRetries: 5,
        requestTimeout: 60000,
        auth: {
          username: process.env.ELASTICSEARCH_USERNAME,
          password: process.env.ELASTICSEARCH_PASSWORD,
        },
        tls: {
          // ca: readFileSync('../http_car.crt'),
          rejectUnauthorized: false,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [
    {
      provide: Provider.SearchService,
      useClass: SearchService,
    },
  ],
  exports: [Provider.SearchService, ElasticsearchModule],
})
export class SearchModule {}
