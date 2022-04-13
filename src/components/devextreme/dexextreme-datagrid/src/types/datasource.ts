import {
  Store,
  StoreOptions,
  SearchOperation,
  FilterDescriptor,
  SortDescriptor,
  GroupDescriptor,
  SelectDescriptor,
} from 'devextreme/data/index';
import DataSource from 'devextreme/data/data_source';

export declare type DataSourceLikes = DataSourceLike<any, any>;

export type DataSourceLike<TItem, TKey = any> =
  | string
  | Array<TItem>
  | Store<TItem, TKey>
  | DataSourceOptionsStub<any, any, TItem>
  | DataSource<TItem, TKey>;

/**
 *
 */
export interface DataSourceOptionsStub<
  TStoreItem = any,
  TMappedItem = TStoreItem,
  TItem = TMappedItem,
> {
  customQueryParams?: any;
  expand?: Array<string> | string;
  filter?: FilterDescriptor | Array<FilterDescriptor>;
  group?: GroupDescriptor<TItem> | Array<GroupDescriptor<TItem>>;
  map?: (dataItem: TStoreItem) => TMappedItem;
  onChanged?: (e: { readonly changes?: Array<TMappedItem> }) => void;
  onLoadError?: (error: { readonly message?: string }) => void;
  onLoadingChanged?: (isLoading: boolean) => void;
  pageSize?: number;
  paginate?: boolean;
  postProcess?: (data: Array<TMappedItem>) => Array<TItem>;
  pushAggregationTimeout?: number;
  requireTotalCount?: boolean;
  reshapeOnPush?: boolean;
  searchExpr?: string | Function | Array<string | Function>;
  searchOperation?: SearchOperation;
  searchValue?: any;
  select?: SelectDescriptor<TItem>;
  sort?: SortDescriptor<TItem> | Array<SortDescriptor<TItem>>;
  store?: Array<TStoreItem> | Store<TStoreItem, any> | StoreOptions<TStoreItem, any>;
}
