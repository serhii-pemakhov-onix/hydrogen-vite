import type {ProductVariantType} from './product-variant.type';

export type ProductType = {
  id: string;
  title: string;
  publishedAt: string;
  handle: string;
  variants: {
    nodes: ProductVariantType[];
  };
};
