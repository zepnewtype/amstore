import { Link } from 'react-router-dom';

interface ProductBreadcrumbProps {
  productName: string;
}

const ProductBreadcrumb = ({ productName }: ProductBreadcrumbProps) => {
  return (
    <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
      <div className="container-custom">
        <div className="flex items-center text-sm">
          <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-gray-800">{productName}</span>
        </div>
      </div>
    </div>
  );
};

export default ProductBreadcrumb;
