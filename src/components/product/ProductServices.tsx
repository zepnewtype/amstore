import { motion } from 'framer-motion';
import { TruckIcon, RefreshCcw } from 'lucide-react';

const ProductServices = () => {
  return (
    <motion.div 
      className="space-y-3 border-t border-b border-gray-200 py-6 mb-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.7 }}
    >
      <div className="flex items-center">
        <TruckIcon size={18} className="mr-3 text-brand-green" />
        <span className="text-sm">Fast shipping in UAE</span>
      </div>
      <div className="flex items-center">
        <RefreshCcw size={18} className="mr-3 text-brand-green" />
        <span className="text-sm">Free returns within 30 days</span>
      </div>
    </motion.div>
  );
};

export default ProductServices;
