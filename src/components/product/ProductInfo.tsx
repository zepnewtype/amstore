import { useState } from 'react';
import { motion } from 'framer-motion';

interface ProductInfoProps {
  name: string;
  itemNo: string;
  diameter: string;
  price: number;
  inStock: number;
  deliveryTime: string;
  currency?: string;
}

const ProductInfo = ({
  name,
  itemNo,
  diameter,
  price,
  inStock,
  deliveryTime,
  currency = "AED"
}: ProductInfoProps) => {
  // Animation variants
  const fadeIn = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <>
      <motion.div {...fadeIn}>
        <div className="mb-4 flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-serif mb-1">{name}</h1>
            <p className="text-sm text-gray-600 mb-3">Baci Milano</p>
            <p className="text-sm text-gray-500 mb-2">Item no. {itemNo}</p>
            <p className="text-sm text-gray-500 mb-2">Ø {diameter}</p>
          </div>
          <div className="text-right">
            <p className="text-xl font-medium">{price} {currency}</p>
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
          <span>{inStock} in stock, delivery time approx. {deliveryTime}</span>
        </div>
        <div className="text-sm text-gray-500">
          Otherwise approx. 2 months delivery time
        </div>
      </motion.div>
    </>
  );
};

export default ProductInfo;
