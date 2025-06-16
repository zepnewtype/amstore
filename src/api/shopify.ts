// src/api/shopify.ts

// Для корректной работы import.meta.env убедитесь, что в проекте есть vite-env.d.ts с описанием переменных окружения:
// declare interface ImportMetaEnv {
//   readonly VITE_SHOPIFY_ENDPOINT: string;
//   readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string;
// }
// declare interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

import { SHOPIFY_STORE_URL, SHOPIFY_STOREFRONT_ACCESS_TOKEN } from '@/lib/constants';
import type { ShopifyProduct, ShopifyCollection } from './types';

interface ShopifyFetchOptions {
  query: string;
  variables?: Record<string, any>;
  cache?: RequestCache;
}

export async function shopifyFetch<T>({
  query,
  variables = {},
  cache = 'force-cache',
}: ShopifyFetchOptions): Promise<T> {
  try {
    const response = await fetch(`${SHOPIFY_STORE_URL}/api/2024-01/graphql.json`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': SHOPIFY_STOREFRONT_ACCESS_TOKEN,
      },
      body: JSON.stringify({
        query,
        variables,
      }),
      cache,
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const { data, errors } = await response.json();

    if (errors) {
      console.error('GraphQL Errors:', errors);
      throw new Error(errors[0]?.message || 'GraphQL error occurred');
    }

    return data;
  } catch (error) {
    console.error('Shopify API Error:', error);
    throw error;
  }
}

export function transformProductForFrontend(product: ShopifyProduct): ShopifyProduct {
  if (!product) return null;

  const mainVariant = product.variants.edges[0]?.node || {};
  const price = mainVariant.price?.amount ? Number.parseFloat(mainVariant.price.amount) : 0;
  const compareAtPrice = mainVariant.compareAtPrice?.amount ? Number.parseFloat(mainVariant.compareAtPrice.amount) : 0;

  return {
    ...product,
    variants: {
      edges: product.variants.edges.map(edge => ({
        node: {
          ...edge.node,
          price: {
            ...edge.node.price,
            amount: Number.parseFloat(edge.node.price.amount).toString(),
          },
          compareAtPrice: edge.node.compareAtPrice ? {
            ...edge.node.compareAtPrice,
            amount: Number.parseFloat(edge.node.compareAtPrice.amount).toString(),
          } : null,
        },
      })),
    },
  };
}

export function transformCollectionForFrontend(collection: ShopifyCollection): ShopifyCollection {
  if (!collection) return null;

  return {
    ...collection,
    products: {
      edges: collection.products.edges.map(edge => ({
        node: {
          ...edge.node,
        },
      })),
    },
  };
}
