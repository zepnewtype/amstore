
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Minus, Plus } from 'lucide-react';

interface ProductQuantitySelectorProps {
  initialQuantity?: number;
  onQuantityChange?: (quantity: number) => void;
}

const ProductQuantitySelector = ({ 
  initialQuantity = 1, 
  onQuantityChange 
}: ProductQuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrement = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    if (onQuantityChange) {
      onQuantityChange(newQuantity);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      if (onQuantityChange) {
        onQuantityChange(newQuantity);
      }
    }
  };

  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.4 }}
    >
      <h3 className="text-sm font-medium mb-3">Quantity</h3>
      <div className="flex">
        <motion.button 
          onClick={handleDecrement}
          className="border border-r-0 border-gray-300 w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-l-sm"
          whileTap={{ scale: 0.9 }}
        >
          <Minus size={18} />
        </motion.button>
        <div className="border-y border-gray-300 h-12 w-16 flex items-center justify-center font-medium">
          {quantity}
        </div>
        <motion.button 
          onClick={handleIncrement}
          className="border border-l-0 border-gray-300 w-12 h-12 flex items-center justify-center hover:bg-gray-50 rounded-r-sm"
          whileTap={{ scale: 0.9 }}
        >
          <Plus size={18} />
        </motion.button>
      </div>
    </motion.div>
  );
};

export default ProductQuantitySelector;
