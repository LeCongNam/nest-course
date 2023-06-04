import { SearchRequest } from '@elastic/elasticsearch/lib/api/types';
import { BaseMapping } from '../mapping/base.mapping';

export interface ISearchService {
  indexedDB(baseMapping: BaseMapping, index?: string);
  update(baseMapping: BaseMapping, index?: string);
  bulkCreate(baseMapping: BaseMapping, index?: string);
  bulkUpdate(baseMapping: BaseMapping, index?: string);
  searchQuery(baseMapping: SearchRequest);
}
