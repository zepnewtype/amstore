import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { ChevronRight } from 'lucide-react';
import { getAllCollections } from '../api/shopifyProducts';
import { Helmet } from 'react-helmet';

const Collections = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [collections, setCollections] = useState<any[]>([]);

  useEffect(() => {
    setIsLoading(true);
    getAllCollections()
      .then(setCollections)
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <>
      <Helmet>
        <title>Коллекции</title>
        <meta name="description" content="Все коллекции Amprio Milano. Премиальная посуда, декор и аксессуары." />
      </Helmet>
      <Layout>
        {/* Breadcrumb */}
        <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
          <div className="container-custom">
            <div className="flex items-center text-sm">
              <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
              <span className="mx-2 text-gray-400">/</span>
              <span className="text-gray-800">Collections</span>
            </div>
          </div>
        </div>
        <div className="container-custom py-12">
          <h1 className="text-3xl md:text-4xl font-serif mb-2">Our Collections</h1>
          <p className="text-gray-600 mb-12 max-w-3xl">Discover our carefully curated collections, each telling a unique story through exquisite craftsmanship and timeless design.</p>
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {[1, 2, 3, 4].map((item) => (
                <div key={item} className="aspect-[3/2] bg-gray-100 animate-pulse rounded"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {collections.map((collection) => (
                <Link 
                  key={collection.id} 
                  to={`/collections/${collection.handle}`} 
                  className="group block border border-gray-200 fade-in-element"
                >
                  <div className="relative overflow-hidden aspect-[3/2]">
                    {collection.image?.url && (
                      <img 
                        src={collection.image.url} 
                        alt={collection.image.altText || collection.title} 
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                  <div className="p-6">
                    <h2 className="text-xl font-serif mb-2">{collection.title}</h2>
                    <p className="text-gray-600 mb-4">{collection.description}</p>
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-500">{collection.products?.length || 0} products</span>
                      <div className="flex items-center text-brand-green group-hover:translate-x-1 transition-transform">
                        <span className="mr-1 text-sm font-medium">View collection</span>
                        <ChevronRight size={16} />
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </Layout>
    </>
  );
};

export default Collections;
