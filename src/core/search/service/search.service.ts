import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';
import { BaseMapping } from '../mapping/base.mapping';
import { ISearchService } from '../interface';
import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';

@Injectable()
export class SearchService implements ISearchService {
  private index: string;

  constructor(private readonly _esSearch: ElasticsearchService) {
    this.index = 'nest_course';
  }

  public async indexedDB(baseMapping: BaseMapping, index?: string) {
    const result = await this._esSearch.index({
      index: index || this.index,
      id: baseMapping.id.toString(),
      body: baseMapping,
    });
    return result;
  }

  update(baseMapping: BaseMapping, index?: string) {
    throw new Error('Method not implemented.');
  }
  bulkCreate(baseMapping: BaseMapping, index?: string) {
    throw new Error('Method not implemented.');
  }
  bulkUpdate(baseMapping: BaseMapping, index?: string) {
    throw new Error('Method not implemented.');
  }
  public async searchQuery(baseMapping: SearchRequest, index?: string) {
    try {
      console.log('QR');

      return await this._esSearch.search({
        index: 'user' || index || this.index,
        // filter_path: '_search',
        body: {
          query: {
            match: {
              username: 'Pauline_Quitzon',
            },
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  }
}
