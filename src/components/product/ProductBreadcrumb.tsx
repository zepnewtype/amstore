import { Link } from 'react-router-dom';

interface ProductBreadcrumbProps {
  product: {
    title: string;
    collections?: { title: string; handle: string }[];
  };
}

const ProductBreadcrumb = ({ product }: ProductBreadcrumbProps) => {
  const collection = product.collections && product.collections.length > 0 ? product.collections[0] : null;
  return (
    <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
          {collection && (
            <>
              <span className="mx-2 text-gray-400">/</span>
              <Link to={`/collections/${collection.handle}`} className="text-gray-500 hover:text-brand-green transition-colors">{collection.title}</Link>
            </>
          )}
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">{product.title}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
