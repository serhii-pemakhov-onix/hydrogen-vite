import {json, useLoaderData} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {getPaginationVariables} from '@shopify/hydrogen';
import ProductGrid from '~/components/ProductGrid';
import type {CollectionType} from '~/types/collection.type';

const seo = ({data}: {data: {collection: CollectionType}}) => ({
  title: data?.collection?.title,
  description: data?.collection?.description?.slice(0, 154),
});

export const handle = {
  seo,
};

export function meta({data}: {data: {collection?: CollectionType}}) {
  return [
    {title: data?.collection?.title},
    {description: data?.collection?.description},
  ];
}

export async function loader({params, context, request}: LoaderFunctionArgs) {
  const paginationVariables = getPaginationVariables(request, {pageBy: 4});
  const {handle} = params;
  const {collection} = await context.storefront.query(COLLECTIONS_QUERY, {
    variables: {...paginationVariables, handle},
  });

  if (!collection) {
    throw new Response(null, {status: 404});
  }

  return json({collection});
}

export default function Collection() {
  const {collection}: {collection: CollectionType} = useLoaderData();

  return (
    <>
      <header className="grid w-full gap-8 py=8 justify-items-start">
        <h1 className="text-4xl w-full">{collection.title}</h1>
        {collection.description && (
          <div className="flex items-baseline justify-between w-full">
            <div>
              <p className="max-w-md whitespace-pre-wrap inline-block inherit text-copy">
                {collection.description}
              </p>
            </div>
          </div>
        )}
      </header>
      <ProductGrid collection={collection} />
    </>
  );
}

const COLLECTIONS_QUERY = `
  query CollectionDetails(
    $handle: String!
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) {
    collection(handle: $handle) {
      id
      title
      description
      handle
      products(
        first: $first,
        last: $last,
        before: $startCursor,
        after: $endCursor,
      ) {
        nodes {
          id
          title
          publishedAt
          handle
          variants(first: 1) {
            nodes {
              id
              image {
                altText
                url
                width
                height
              }
              price {
                amount
                currencyCode
              }
              compareAtPrice {
                amount
                currencyCode
              }
            }
          }
        }
        pageInfo {
          hasPreviousPage
          hasNextPage
          startCursor
          endCursor
        }
      }
    }
  }
`;
