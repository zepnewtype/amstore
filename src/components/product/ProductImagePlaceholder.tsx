import React from 'react';
import { ImageOff } from 'lucide-react';

interface ProductImagePlaceholderProps {
  className?: string;
  text?: string;
}

const ProductImagePlaceholder: React.FC<ProductImagePlaceholderProps> = ({ 
  className = '', 
  text = 'Image coming soon' 
}) => {
  return (
    <div className={`flex items-center justify-center bg-gray-100 ${className}`}>
      <div className="text-center p-4">
        <ImageOff 
          className="mx-auto text-gray-400 mb-2"
          size={48}
        />
        <p className="text-gray-500 font-medium">{text}</p>
      </div>
    </div>
  );
};

export default ProductImagePlaceholder;
