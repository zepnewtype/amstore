import { shopifyFetch } from "./shopify";
import { transformProductForFrontend, transformCollectionForFrontend } from "./shopify";
import { ITEMS_PER_PAGE } from "@/lib/constants";
import type {
  ProductsResponse,
  ProductByHandleResponse,
  CollectionByHandleResponse,
  CollectionsResponse,
  ShopifyProduct,
  ShopifyCollection
} from "./types";

// GraphQL query for getting products with pagination
const PRODUCTS_QUERY = `
  query Products($first: Int!, $after: String) {
    products(first: $first, after: $after) {
      edges {
        cursor
        node {
          id
          title
          handle
          description
          descriptionHtml
          productType
          vendor
          availableForSale
          tags
          createdAt
          updatedAt
          options {
            id
            name
            values
          }
          variants(first: 10) {
            edges {
              node {
                id
                title
                sku
                availableForSale
                quantityAvailable
                price {
                  amount
                  currencyCode
                }
                compareAtPrice {
                  amount
                  currencyCode
                }
                selectedOptions {
                  name
                  value
                }
                image {
                  id
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
          images(first: 5) {
            edges {
              node {
                id
                url
                altText
                width
                height
              }
            }
          }
          seo {
            title
            description
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Query for getting a single product by handle
const PRODUCT_BY_HANDLE_QUERY = `
  query ProductByHandle($handle: String!) {
    productByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      productType
      vendor
      availableForSale
      tags
      createdAt
      updatedAt
      options {
        id
        name
        values
      }
      variants(first: 10) {
        edges {
          node {
            id
            title
            sku
            availableForSale
            quantityAvailable
            price {
              amount
              currencyCode
            }
            compareAtPrice {
              amount
              currencyCode
            }
            selectedOptions {
              name
              value
            }
            image {
              id
              url
              altText
              width
              height
            }
          }
        }
      }
      images(first: 5) {
        edges {
          node {
            id
            url
            altText
            width
            height
          }
        }
      }
      seo {
        title
        description
      }
    }
  }
`;

// Query for getting a collection by handle
const COLLECTION_QUERY = `
  query CollectionByHandle($handle: String!) {
    collectionByHandle(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      image {
        id
        altText
        url
      }
      seo {
        title
        description
      }
      products(first: 10) {
        edges {
          node {
            id
            title
            handle
          }
        }
      }
    }
  }
`;

// Query for getting all collections
const ALL_COLLECTIONS_QUERY = `
  query Collections($first: Int, $after: String) {
    collections(first: $first, after: $after) {
      edges {
        node {
          id
          title
          handle
          description
          descriptionHtml
          image {
            id
            altText
            url
          }
          seo {
            title
            description
          }
          products(first: 10) {
            edges {
              node {
                id
                title
                handle
              }
            }
          }
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
`;

// Get product by handle
export async function getProductByHandle(handle: string): Promise<ShopifyProduct | null> {
  const data = await shopifyFetch<ProductByHandleResponse>({
    query: PRODUCT_BY_HANDLE_QUERY,
    variables: { handle }
  });
  if (!data.productByHandle) return null;
  return transformProductForFrontend(data.productByHandle);
}

// Get collection by handle
export async function getCollectionByHandle(handle: string): Promise<ShopifyCollection | null> {
  const data = await shopifyFetch<CollectionByHandleResponse>({
    query: COLLECTION_QUERY,
    variables: { handle }
  });
  if (!data.collectionByHandle) return null;
  return transformCollectionForFrontend(data.collectionByHandle);
}

// Get all products with pagination
export async function getAllProducts(): Promise<ShopifyProduct[]> {
  let allProducts: ShopifyProduct[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const data = await shopifyFetch<ProductsResponse>({
      query: PRODUCTS_QUERY,
      variables: {
        first: ITEMS_PER_PAGE,
        after: endCursor,
      }
    });
    const products = data.products.edges.map((edge) =>
      transformProductForFrontend(edge.node)
    );
    allProducts = [...allProducts, ...products];
    hasNextPage = data.products.pageInfo.hasNextPage;
    endCursor = data.products.pageInfo.endCursor;
  }

  return allProducts;
}

// Get all collections
export async function getAllCollections(): Promise<ShopifyCollection[]> {
  let allCollections: ShopifyCollection[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const data = await shopifyFetch<CollectionsResponse>({
      query: ALL_COLLECTIONS_QUERY,
      variables: {
        first: ITEMS_PER_PAGE,
        after: endCursor,
      }
    });
    const collections = data.collections.edges.map((edge) =>
      transformCollectionForFrontend(edge.node)
    );
    allCollections = [...allCollections, ...collections];
    hasNextPage = data.collections.pageInfo.hasNextPage;
    endCursor = data.collections.pageInfo.endCursor;
  }

  return allCollections;
}
