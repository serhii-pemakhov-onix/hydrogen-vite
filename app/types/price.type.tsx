import type {CurrencyCode} from '@shopify/hydrogen/customer-account-api-types';

export type PriceType = {
  amount: string;
  currencyCode?: CurrencyCode;
};
