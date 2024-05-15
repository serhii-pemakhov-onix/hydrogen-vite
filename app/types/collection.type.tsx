import type {PageInfo} from '@shopify/hydrogen/storefront-api-types';
import type {ImageType} from './image.type';
import type {ProductType} from './product.type';

export type CollectionType = {
  id: string;
  title: string;
  handle: string;
  image: ImageType;
  description?: string;
  products: {
    nodes: ProductType[];
    pageInfo: PageInfo;
  };
};
