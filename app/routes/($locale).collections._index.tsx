import {useLoaderData, Link} from '@remix-run/react';
import type {LoaderFunctionArgs} from '@remix-run/server-runtime';
import {Image} from '@shopify/hydrogen';
import type {CollectionType} from '~/types/collection.type';

export function meta() {
  return [
    {title: 'Hydrogen'},
    {description: 'A custom storefront powered by Hydrogen'},
  ];
}

export async function loader({context, params}: LoaderFunctionArgs) {
  return await context.storefront.query(COLLECTIONS_QUERY);
}

export default function Index() {
  const {collections}: {collections: {nodes: CollectionType[]}} =
    useLoaderData();

  return (
    <section className="grid w-full gap-4 gap-y-4">
      <h2 className="whitespace-pre-wrap max-w-prose font-bold text-lead">
        Collections
      </h2>
      <div className="grid-flow-row grid gap-4 lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-1 grid-rows-auto">
        {collections.nodes.map((collection) => {
          return (
            <Link
              to={`/collections/${collection.handle}`}
              key={collection.id}
              className="grid justify-items-center gap-y-4"
              // handle={collection.handle}
            >
              <Image
                alt={`Image from collection ${collection.title}`}
                data={collection.image}
                className="rounded-lg"
              />
              {collection.title}
            </Link>
          );
        })}
      </div>
    </section>
  );
}

const COLLECTIONS_QUERY = `#graphql
  query FeaturedCollections {
    collections(first: 8) {
      nodes {
        id
        title
        handle
        image {
          url
          altText
          width
          height
        }
      }
    }
  }
`;
