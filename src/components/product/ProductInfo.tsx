import { motion } from 'framer-motion';

interface ProductInfoProps {
  product: {
    title: string;
    options: { name: string; values: string[] }[];
  };
  variant: {
    sku: string;
    price: number;
    compareAtPrice?: number;
    quantityAvailable: number;
    currency?: string;
  };
  deliveryTime?: string;
}

const ProductInfo = ({ product, variant, deliveryTime = '4-5 working days' }: ProductInfoProps) => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const diameter = product.options.find((o) => o.name.toLowerCase().includes('size'))?.values[0] || '';

  return (
    <>
      <motion.div {...fadeIn}>
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-serif mb-1">{product.title}</h1>
            <p className="text-sm text-gray-600 mb-3">Baci Milano</p>
            <p className="text-sm text-gray-500 mb-2">Item no. {variant.sku}</p>
            <p className="text-sm text-gray-500 mb-2">Ø {diameter}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-medium">{variant.price} {variant.currency || 'AED'}</p>
            {variant.compareAtPrice && variant.compareAtPrice > variant.price && (
              <p className="text-sm text-gray-400 line-through">{variant.compareAtPrice} {variant.currency || 'AED'}</p>
            )}
          </div>
        </div>
      </motion.div>
      {/* Availability and delivery info */}
      <motion.div 
        className="mb-6 pt-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <div className="flex items-center mb-2 text-sm">
          <span className="text-brand-green mr-2">✓</span>
          <span>{variant.quantityAvailable} in stock, delivery time approx. {deliveryTime}</span>
        </div>
        <div className="text-sm text-gray-500">
          Otherwise approx. 2 months delivery time
        </div>
      </motion.div>
    </>
  );
};

export default ProductInfo;
