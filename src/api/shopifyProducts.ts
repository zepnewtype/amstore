import { shopifyFetch } from "./shopify";
import { transformCollectionForFrontend } from "../lib/utils";

// Корректный GraphQL-запрос для получения товаров с пагинацией
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

// Новый запрос для одного товара по handle
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

const COLLECTION_QUERY = `
  query ($handle: String!) {
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

const ALL_COLLECTIONS_QUERY = `
  query ($first: Int, $after: String) {
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

// Получить товар по handle
export async function getProductByHandle(handle: string) {
  const data = await shopifyFetch(PRODUCT_BY_HANDLE_QUERY, { handle });
  if (!data.productByHandle) return null;
  return transformProductForFrontend(data.productByHandle);
}

// Получить коллекцию по handle
export async function getCollectionByHandle(handle: string) {
  const data = await shopifyFetch(COLLECTION_QUERY, { handle });
  if (!data.collectionByHandle) return null;
  return transformCollectionForFrontend(data.collectionByHandle);
}

// Получить все товары с пагинацией
export async function getAllProducts() {
  let allProducts: any[] = [];
  let hasNextPage = true;
  let endCursor: string | null = null;

  while (hasNextPage) {
    const data = await shopifyFetch(PRODUCTS_QUERY, {
      first: 100,
      after: endCursor,
    });
    const products = data.products.edges.map((edge: any) =>
      transformProductForFrontend(edge.node)
    );
    allProducts = [...allProducts, ...products];
    hasNextPage = data.products.pageInfo.hasNextPage;
    endCursor = data.products.pageInfo.endCursor;
  }
  return allProducts;
}

// Получить все коллекции с пагинацией
export async function getAllCollections() {
  let allCollections: any[] = [];
  let hasNextPage = true;
  let endCursor = null;
  while (hasNextPage) {
    const data = await shopifyFetch(ALL_COLLECTIONS_QUERY, { first: 100, after: endCursor });
    const collections = data.collections.edges.map((edge: any) => edge.node);
    allCollections = [...allCollections, ...collections];
    hasNextPage = data.collections.pageInfo.hasNextPage;
    endCursor = data.collections.pageInfo.endCursor;
  }
  return allCollections.map(transformCollectionForFrontend);
}

export function transformProductForFrontend(product: any) {
  return {
    id: product.id,
    title: product.title,
    handle: product.handle,
    url: `/products/${product.handle}`,
    description: product.description,
    descriptionHtml: product.descriptionHtml,
    type: product.productType,
    vendor: product.vendor,
    availableForSale: product.availableForSale,
    tags: product.tags,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
    seo: {
      title: product.seo?.title || product.title,
      description: product.seo?.description || product.description,
    },
    options: product.options.map((option: any) => ({
      id: option.id,
      name: option.name,
      values: option.values,
    })),
    variants: product.variants.edges.map((edge: any) => {
      const v = edge.node;
      return {
        id: v.id,
        title: v.title,
        sku: v.sku,
        availableForSale: v.availableForSale,
        quantityAvailable: v.quantityAvailable,
        price: v.price ? parseFloat(v.price.amount) : null,
        currency: v.price ? v.price.currencyCode : null,
        compareAtPrice: v.compareAtPrice ? parseFloat(v.compareAtPrice.amount) : null,
        compareAtCurrency: v.compareAtPrice ? v.compareAtPrice.currencyCode : null,
        selectedOptions: v.selectedOptions,
        image: v.image
          ? {
              id: v.image.id,
              url: v.image.url,
              altText: v.image.altText,
              width: v.image.width,
              height: v.image.height,
            }
          : null,
      };
    }),
    images: product.images.edges.map((edge: any) => ({
      id: edge.node.id,
      url: edge.node.url,
      altText: edge.node.altText,
      width: edge.node.width,
      height: edge.node.height,
    })),
  };
} 