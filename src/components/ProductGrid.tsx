import { Link } from 'react-router-dom';
import ProductCard from './ProductCard';
import { useCart } from './Cart';
import { ImageOff } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  price: number;
  image: string | null;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  itemNo?: string;
  diameter?: string;
  inStock?: number;
  deliveryTime?: string;
  description?: string;
  handle?: string;
}

interface ProductGridProps {
  products: Product[];
  title?: string;
  subtitle?: string;
  columns?: 2 | 3 | 4;
  layout?: 'grid' | 'list' | 'scroll';
  isLoading?: boolean;
}

const ProductGrid = ({ 
  products,
  title,
  subtitle,
  columns = 4,
  layout = 'grid',
  isLoading = false
}: ProductGridProps) => {
  const getGridClass = () => {
    switch (columns) {
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      case 4:
      default:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4";
    }
  };

  if (isLoading) {
    return (
      <div className={`grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-${columns} gap-4 md:gap-6`}>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
            <div className="h-40 bg-gray-200 rounded mb-4 shimmer" />
            <div className="h-4 bg-gray-200 rounded w-3/4 mb-2 shimmer" />
            <div className="h-4 bg-gray-100 rounded w-1/2 shimmer" />
            <div className="h-8 bg-gray-100 rounded mt-4 shimmer" />
          </div>
        ))}
      </div>
    );
  }

  if (layout === 'scroll') {
    return (
      <section className="py-8 md:py-16">
        <div className="container-custom">
          {/* Optional section header */}
          {(title || subtitle) && (
            <div className="text-center mb-6 md:mb-12">
              {subtitle && <p className="uppercase tracking-wider text-sm text-brand-green mb-1 md:mb-2">{subtitle}</p>}
              {title && <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif">{title}</h2>}
            </div>
          )}

          {/* Scrollable product container with snap */}
          <div className="flex overflow-x-auto pb-6 -mx-4 px-4 snap-x snap-mandatory scrollbar-hide">
            <div className="flex gap-4 md:gap-6">
              {products.map((product) => (
                <div key={product.id} className="flex-shrink-0 w-[70vw] max-w-[260px] snap-start">
                  <Link to={`/products/${product.handle || product.id}`} className="block">
                    <div className="aspect-square w-full bg-gray-50 mb-3">
                      {product.image ? (
                        <img
                          src={product.image || "/placeholder.svg"}
                          alt={product.name}
                          className="w-full h-full object-contain"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageOff className="text-gray-400" size={32} />
                        </div>
                      )}
                    </div>
                    <h3 className="text-sm font-medium line-clamp-2">{product.name}</h3>
                    <div className="mt-1">
                      {product.isSale && product.salePrice ? (
                        <div className="flex items-center gap-2">
                          <span className="text-[#E53935] font-medium">{product.salePrice} AED</span>
                          <span className="text-gray-400 line-through text-xs">{product.price} AED</span>
                        </div>
                      ) : (
                        <span className="font-medium">{product.price} AED</span>
                      )}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (layout === 'list') {
    return (
      <section className="py-6 md:py-8">
        <div className="container-custom">
          {/* Optional section header */}
          {(title || subtitle) && (
            <div className="text-center mb-6 md:mb-8">
              {subtitle && <p className="uppercase tracking-wider text-sm text-brand-green mb-1 md:mb-2">{subtitle}</p>}
              {title && <h2 className="text-2xl md:text-3xl font-serif">{title}</h2>}
            </div>
          )}

          {/* Product list */}
          <div className="space-y-4 md:space-y-8">
            {products.map((product) => (
              <div key={product.id} className="product-line-item animate-hover-scale">
                <div className="product-line-image">
                  {product.image ? (
                    <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full h-auto" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-100 aspect-square">
                      <div className="text-center">
                        <ImageOff className="mx-auto text-gray-400 mb-2" size={32} />
                        <p className="text-sm text-gray-500">No image available</p>
                      </div>
                    </div>
                  )}
                </div>
                <div className="product-line-details">
                  <h3 className="line-item-title line-clamp-2">{product.name}</h3>
                  {product.itemNo && <p className="text-sm text-gray-500">Item no. {product.itemNo}</p>}
                  {product.diameter && <p className="text-sm text-gray-500">Ø {product.diameter}</p>}
                  <div className="flex items-center my-2">
                    {product.isSale && product.salePrice ? (
                      <>
                        <span className="text-[#E53935] font-medium mr-2">{product.salePrice} AED</span>
                        <span className="text-gray-400 line-through">{product.price} AED</span>
                      </>
                    ) : (
                      <span className="font-medium">{product.price} AED</span>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-8 md:py-16">
      <div className="container-custom">
        {/* Optional section header */}
        {(title || subtitle) && (
          <div className="text-center mb-8 md:mb-12">
            {subtitle && <p className="uppercase tracking-wider text-sm text-brand-green mb-1 md:mb-2">{subtitle}</p>}
            {title && <h2 className="text-2xl md:text-3xl lg:text-4xl font-serif">{title}</h2>}
          </div>
        )}
        
        {/* Product grid */}
        <div className={`grid ${getGridClass()} gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-10`}>
          {products.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              image={product.image || ''} 
              handle={product.handle || String(product.id)}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductGrid;
