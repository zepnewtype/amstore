import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// SEO fallback-функции
export function getSEOTitle(entity: { seo: { title: string | null }, title: string }) {
  return entity.seo?.title || entity.title;
}

export function getSEODescription(entity: { seo: { description: string | null }, description: string }) {
  return entity.seo?.description || entity.description;
}

// Трансформация товара для фронта
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
    status: product.status,
    tags: product.tags,
    createdAt: new Date(product.createdAt),
    updatedAt: new Date(product.updatedAt),
    seo: {
      title: getSEOTitle(product),
      description: getSEODescription(product)
    },
    options: product.options?.map((option: any) => ({
      id: option.id,
      name: option.name,
      values: option.values
    })) || [],
    variants: (product.variants?.edges || []).map((edge: any) => edge.node).map((variant: any) => ({
      id: variant.id,
      title: variant.title,
      sku: variant.sku,
      price: parseFloat(variant.price),
      compareAtPrice: variant.compareAtPrice ? parseFloat(variant.compareAtPrice) : null,
      inventoryQuantity: variant.inventoryQuantity
    })),
    images: (product.media?.edges || [])
      .map((edge: any) => edge.node)
      .filter((node: any) => node.__typename === "MediaImage" || node.image)
      .map((node: any) => ({
        id: node.id,
        altText: node.image?.altText || product.title,
        url: node.image?.url
      })),
    collections: (product.collections?.edges || []).map((edge: any) => edge.node).map((collection: any) => ({
      id: collection.id,
      title: collection.title,
      handle: collection.handle,
      url: `/collections/${collection.handle}`
    }))
  };
}

// Трансформация коллекции для фронта
export function transformCollectionForFrontend(collection: any) {
  return {
    id: collection.id,
    title: collection.title,
    handle: collection.handle,
    url: `/collections/${collection.handle}`,
    description: collection.description,
    descriptionHtml: collection.descriptionHtml,
    image: collection.image
      ? {
          id: collection.image.id,
          altText: collection.image.altText,
          url: collection.image.url
        }
      : null,
    seo: {
      title: getSEOTitle(collection),
      description: getSEODescription(collection)
    },
    products: (collection.products?.edges || []).map((edge: any) => edge.node).map((product: any) => ({
      id: product.id,
      title: product.title,
      handle: product.handle,
      url: `/products/${product.handle}`
    }))
  };
}
