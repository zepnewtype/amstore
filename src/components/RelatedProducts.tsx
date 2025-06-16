import ProductCard from './ProductCard';

interface Product {
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
  title: string;
  subtitle?: string;
  products: Product[];
}

const RelatedProducts = ({ title, subtitle, products }: RelatedProductsProps) => {
  return (
    <div className="mt-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-center">
          <div className="bg-white px-6">
            {subtitle && <p className="uppercase tracking-wider text-xs text-brand-green mb-1">{subtitle}</p>}
            <h2 className="text-xl font-serif">{title}</h2>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} {...product} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
