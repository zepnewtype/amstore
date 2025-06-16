import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getCollectionByHandle, getProductByHandle } from '../api/shopifyProducts';
import { Helmet } from 'react-helmet';

function formatPrice(amount: number, currency: string) {
  return new Intl.NumberFormat('en-AE', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(amount);
}

const fallbackImg = '/fallback-product.png';

const Collection = () => {
  const { handle } = useParams<{ handle: string }>();
  const [collection, setCollection] = useState<any>(null);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!handle) return;
    setLoading(true);
    getCollectionByHandle(handle)
      .then(async (col) => {
        setCollection(col);
        if (col && col.products) {
          // Загружаем полные данные о каждом товаре коллекции
          const prods = await Promise.all(
            col.products.map((p: any) => getProductByHandle(p.handle))
          );
          setProducts(prods.filter(Boolean));
        }
      })
      .finally(() => setLoading(false));
  }, [handle]);

  if (loading) return <div>Загрузка...</div>;
  if (!collection) return <div>Коллекция не найдена</div>;

  return (
    <>
      <Helmet>
        <title>{collection.seo?.title || collection.title}</title>
        <meta name="description" content={collection.seo?.description || collection.description} />
        {collection.image?.url && <meta property="og:image" content={collection.image.url} />}
      </Helmet>
      <Layout>
        <h1 className="text-3xl font-bold mb-4">{collection.title}</h1>
        {collection.image?.url && (
          <img src={collection.image.url} alt={collection.image?.altText || collection.title} className="mb-6 max-w-xl rounded" />
        )}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} to={`/products/${product.handle}`} className="block group">
              <div className="bg-gray-100 aspect-square flex items-center justify-center rounded mb-2 overflow-hidden">
                <img
                  src={product.images[0]?.url || fallbackImg}
                  alt={product.images[0]?.altText || product.title}
                  className="object-contain w-full h-full group-hover:scale-105 transition"
                  loading="lazy"
                />
              </div>
              <div className="font-medium text-base mb-1 truncate">{product.title}</div>
              <div className="text-sm text-gray-600 font-semibold">
                {product.variants[0]?.price ? formatPrice(product.variants[0].price, product.variants[0].currency || 'AED') : '—'}
              </div>
            </Link>
          ))}
        </div>
      </Layout>
    </>
  );
};

export default Collection;
