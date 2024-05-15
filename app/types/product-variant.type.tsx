import type {PriceType} from './price.type';
import type {ImageType} from './image.type';

export type ProductVariantType = {
  id: string;
  image: ImageType;
  price: PriceType;
  comparedAtPrice: PriceType;
};
