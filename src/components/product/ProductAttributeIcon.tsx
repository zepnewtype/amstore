
import React from 'react';

interface ProductAttributeIconProps {
  icon: React.ReactNode;
  label: string;
  value: string;
}

const ProductAttributeIcon: React.FC<ProductAttributeIconProps> = ({ icon, label, value }) => {
  return (
    <div className="flex items-center mb-4">
      <div className="w-10 h-10 flex items-center justify-center bg-brand-green/10 rounded-full mr-3 text-brand-green">
        {icon}
      </div>
      <div>
        <span className="font-medium text-sm">{label}:</span>{' '}
        <span className="text-gray-700">{value}</span>
      </div>
    </div>
  );
};

export default ProductAttributeIcon;
