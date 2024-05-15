import type {CurrencyCode} from '@shopify/hydrogen/storefront-api-types';
import type {ImageType} from './image.type';

export type ProductVariantType = {
  id: string;
  title: string;
  availableForSale: string;
  price: {
    currencyCode?: CurrencyCode;
    amount: string;
  };
  compareAtPrice: {
    currencyCode: string;
    amount: string;
  };
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image?: ImageType;
};

export type ProductSelectedVariantType = {
  id: string;
  availableForSale: boolean;
  selectedOptions: {
    name: string;
    value: string;
  }[];
  image: {
    id: string;
    url: string;
    altText: string;
    width: number;
    height: number;
  };
  price: {
    amount: string;
    currencyCode?: CurrencyCode;
  };
  compareAtPrice: {
    amount: string;
    currencyCode: string;
  };
  sku: string;
  title: string;
  unitPrice: {
    amount: string;
    currencyCode: string;
  };
  product: {
    title: string;
    handle: string;
  };
};

export type ProductDataType = {
  id: string;
  title: string;
  handle: string;
  vendor: string;
  description: string;
  descriptionHtml: string;
  featuredImage: ImageType;
  options: {
    name: string;
    values: string[];
  }[];
  // selectedVariant?: ProductSelectedVariantType;
  selectedVariant?: ProductVariantType;
  variants: {
    nodes: ProductVariantType[];
  };
};

export type ProductShopType = {
  primaryDomain: {
    url: string;
  };
};
