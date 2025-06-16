import ProductCard from './ProductCard';

interface RelatedProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  hoverImage?: string;
  isNew?: boolean;
  isSale?: boolean;
  salePrice?: number;
  itemNo?: string;
  diameter?: string;
  description?: string;
}

interface RelatedProductsProps {
  products: RelatedProduct[];
  currentProductId?: number;
}

const RelatedProducts = ({ products, currentProductId }: RelatedProductsProps) => {
  // Filter out current product if provided
  const filteredProducts = currentProductId 
    ? products.filter(product => product.id !== currentProductId)
    : products;

  // Show only first 4 products
  const displayProducts = filteredProducts.slice(0, 4);

  if (displayProducts.length === 0) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif">You Might Also Like</h2>
          <p className="text-gray-600 mt-2">Discover more exceptional pieces from our collection</p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {displayProducts.map((product) => (
            <ProductCard 
              key={product.id} 
              {...product} 
              handle={`product-${product.id}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default RelatedProducts;
