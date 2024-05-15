import {
  Link,
  useLocation,
  useNavigation,
  useSearchParams,
} from '@remix-run/react';
import type {
  ProductDataType,
  ProductVariantType,
} from '~/types/product-data.type';

export default function ProductOptions({
  product,
  selectedVariant,
}: {
  product: ProductDataType;
  selectedVariant: ProductVariantType;
}) {
  const {options} = product;
  const {pathname, search} = useLocation();
  const [currentSearchParams] = useSearchParams();
  const navigation = useNavigation();

  const paramsWithDefaults = (() => {
    const defaultParams = new URLSearchParams(currentSearchParams);

    if (!selectedVariant) {
      return defaultParams;
    }

    for (const {name, value} of selectedVariant.selectedOptions) {
      if (!currentSearchParams.has(name)) {
        defaultParams.set(name, value);
      }
    }

    return defaultParams;
  })();

  const searchParams = navigation.location
    ? new URLSearchParams(navigation.location.search)
    : paramsWithDefaults;

  return (
    <div>
      {options.length &&
        options.map(({name, values}) => {
          return (
            values.length && (
              <div
                key={name}
                className="flex flex-col flex-wrap mb-4 gap-y-2 last:mb-0"
              >
                <h3 className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                  {name}
                </h3>
                <div className="flex flex-wrap items-baseline gap-4">
                  {values.map((value) => {
                    const linkParams = new URLSearchParams(search);
                    const isSelected = searchParams.get(name) === value;

                    linkParams.set(name, value);

                    return (
                      <Link
                        key={value}
                        to={`${pathname}?${linkParams.toString()}`}
                        preventScrollReset
                        replace
                        className={`leading-none py-1 border-b-[1.5px] ${
                          isSelected ? 'border-gray-500' : 'border-neutral-50'
                        } cursor-pointer hover:no-underline transition-all duration-200`}
                      >
                        {value}
                      </Link>
                    );
                  })}
                </div>
              </div>
            )
          );
        })}
    </div>
  );
}
