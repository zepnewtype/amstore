import { motion } from 'framer-motion';

interface ColorOption {
  color: string;
  image: string;
}

interface ProductColorSelectorProps {
  colorOptions: ColorOption[];
  selectedColor: string;
  onColorChange?: (color: string, image: string) => void;
}

const ProductColorSelector = ({ 
  colorOptions, 
  selectedColor, 
  onColorChange
}: ProductColorSelectorProps) => {
  return (
    <motion.div 
      className="mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
    >
      <h3 className="text-sm font-medium mb-3">Color: <span className="text-brand-green">{selectedColor}</span></h3>
      <div className="flex gap-3">
        {colorOptions.map(opt => (
          <motion.button
            key={opt.color}
            onClick={() => onColorChange && onColorChange(opt.color, opt.image)}
            className={`w-12 h-12 rounded-full flex items-center justify-center border ${selectedColor === opt.color ? 'ring-2 ring-offset-2 ring-brand-green border-brand-green' : 'border-gray-200'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <img
              src={opt.image}
              alt={opt.color}
              className="w-10 h-10 rounded-full object-cover"
              aria-label={`Select ${opt.color} color`}
            />
          </motion.button>
        ))}
      </div>
    </motion.div>
  );
};

export default ProductColorSelector;
