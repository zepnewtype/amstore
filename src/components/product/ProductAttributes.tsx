import { motion } from 'framer-motion';
import ProductAttributeIcon from './ProductAttributeIcon';

interface ProductAttributesProps {
  materials: string[];
  diameter: string;
  sku: string;
}

const ProductAttributes = ({ materials, diameter, sku }: ProductAttributesProps) => {
  return (
    <motion.div 
      className="mb-6 border-t border-gray-200 pt-4"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.2 }}
    >
      <ProductAttributeIcon 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
            <path d="M13.5 3H12H8C6.34315 3 5 4.34315 5 6V18C5 19.6569 6.34315 21 8 21H11M13.5 3L19 8.625M13.5 3V7.625C13.5 8.17728 13.9477 8.625 14.5 8.625H19M19 8.625V11.8125" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M14 19H14.01M14.5 19C14.5 19.2761 14.2761 19.5 14 19.5C13.7239 19.5 13.5 19.2761 13.5 19C13.5 18.7239 13.7239 18.5 14 18.5C14.2761 18.5 14.5 18.7239 14.5 19Z" stroke="currentColor" strokeWidth="2"/>
            <path d="M14 15L15.5 13.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M14 15L13.5 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            <path d="M14 15L16.5 15.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        }
        label="Materials"
        value={materials.join(', ')}
      />
      <ProductAttributeIcon 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
            <circle cx="12" cy="12" r="10"/>
            <circle cx="12" cy="12" r="4"/>
            <line x1="21.17" x2="12" y1="8" y2="8"/>
            <line x1="3.95" x2="8.54" y1="6.06" y2="14"/>
            <line x1="10.88" x2="15.46" y1="21.94" y2="14"/>
          </svg>
        }
        label="Size"
        value={diameter}
      />
      <ProductAttributeIcon 
        icon={
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
            <path d="m16 6 4 14"/>
            <path d="M12 6v14"/>
            <path d="M8 8v12"/>
            <path d="M4 4v16"/>
          </svg>
        }
        label="SKU"
        value={sku}
      />
    </motion.div>
  );
};

export default ProductAttributes;
