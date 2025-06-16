/// <reference types="vite/client" />

declare interface ImportMetaEnv {
  readonly VITE_SHOPIFY_ENDPOINT: string;
  readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string;
}
declare interface ImportMeta {
  readonly env: ImportMetaEnv;
}
