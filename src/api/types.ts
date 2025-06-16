// Shopify GraphQL Types
export interface ShopifyImage {
  id: string;
  url: string;
  altText: string | null;
  width: number;
  height: number;
}

export interface ShopifyPrice {
  amount: string;
  currencyCode: string;
}

export interface ShopifySelectedOption {
  name: string;
  value: string;
}

export interface ShopifyVariant {
  id: string;
  title: string;
  sku: string | null;
  availableForSale: boolean;
  quantityAvailable: number | null;
  price: ShopifyPrice;
  compareAtPrice: ShopifyPrice | null;
  selectedOptions: ShopifySelectedOption[];
  image: ShopifyImage | null;
}

export interface ShopifyOption {
  id: string;
  name: string;
  values: string[];
}

export interface ShopifySEO {
  title: string | null;
  description: string | null;
}

export interface ShopifyProduct {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  productType: string;
  vendor: string;
  availableForSale: boolean;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  options: ShopifyOption[];
  variants: {
    edges: Array<{
      node: ShopifyVariant;
    }>;
  };
  images: {
    edges: Array<{
      node: ShopifyImage;
    }>;
  };
  seo: ShopifySEO;
}

export interface ShopifyCollection {
  id: string;
  title: string;
  handle: string;
  description: string;
  descriptionHtml: string;
  image: ShopifyImage | null;
  seo: ShopifySEO;
  products: {
    edges: Array<{
      node: {
        id: string;
        title: string;
        handle: string;
      };
    }>;
  };
}

// GraphQL Response Types
export interface ProductsResponse {
  products: {
    edges: Array<{
      cursor: string;
      node: ShopifyProduct;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
}

export interface ProductByHandleResponse {
  productByHandle: ShopifyProduct | null;
}

export interface CollectionByHandleResponse {
  collectionByHandle: ShopifyCollection | null;
}

export interface CollectionsResponse {
  collections: {
    edges: Array<{
      node: ShopifyCollection;
    }>;
    pageInfo: {
      hasNextPage: boolean;
      endCursor: string | null;
    };
  };
} 