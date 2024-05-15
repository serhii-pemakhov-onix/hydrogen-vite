import {Link} from '@remix-run/react';
import {Image, Money} from '@shopify/hydrogen';
import type {PriceType} from '~/types/price.type';
import type {ProductType} from '~/types/product.type';

export default function ProductCard({product}: {product: ProductType}) {
  const {price, comparedAtPrice} = product.variants?.nodes.at(0) || {};
  const isDiscounted =
    price?.amount &&
    comparedAtPrice?.amount &&
    price?.amount < comparedAtPrice?.amount;
  const [variant] = product.variants.nodes || [];
  const {image} = variant || {};

  return (
    <Link to={`/products/${product.handle}`}>
      <div className="grid gap-3">
        <div className="shadow-sm rounded relative">
          <Image data={image} alt={product.title} />
        </div>
        <div className="grid gap-1">
          <h3 className="max-w-prose text-copy w-full overflow-hidden whitespace-nowrap text-ellipsis">
            {product.title}
          </h3>
          <Money withoutTrailingZeros data={price as PriceType} />
          {isDiscounted && (
            <Money
              className="line-through opacity-50"
              withoutTrailingZeros
              data={comparedAtPrice as PriceType}
            />
          )}
        </div>
      </div>
    </Link>
  );
}
