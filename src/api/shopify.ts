// src/api/shopify.ts

// Для корректной работы import.meta.env убедитесь, что в проекте есть vite-env.d.ts с описанием переменных окружения:
// declare interface ImportMetaEnv {
//   readonly VITE_SHOPIFY_ENDPOINT: string;
//   readonly VITE_SHOPIFY_STOREFRONT_TOKEN: string;
// }
// declare interface ImportMeta {
//   readonly env: ImportMetaEnv;
// }

const SHOPIFY_ENDPOINT = 'https://8344ca-27.myshopify.com/api/2023-07/graphql.json';
const SHOPIFY_TOKEN = '0d4ec0486f9d96fb58c0e41d2a50a1f5';

export async function shopifyFetch(query: string, variables: any = {}) {
  // Логируем тип запроса и параметры
  let queryName = '';
  const match = query.match(/\b(query|mutation)\s*(\w+)?/);
  if (match) {
    queryName = match[2] || '[anonymous]';
  }
  console.log('[Shopify API] Импортирован запрос:', queryName, '| variables:', variables);

  const res = await fetch(SHOPIFY_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Storefront-Access-Token': SHOPIFY_TOKEN,
    },
    body: JSON.stringify({ query, variables }),
  });
  const json = await res.json();
  if (json.errors) throw new Error(JSON.stringify(json.errors));
  return json.data;
} 