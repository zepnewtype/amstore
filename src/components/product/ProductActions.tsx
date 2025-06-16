
import { useState } from 'react';
import { motion } from 'framer-motion';
import { Check, Heart, Share2 } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";

interface ProductActionsProps {
  onAddToCart: () => void;
  price: number;
  quantity: number;
  productName: string;
  currency?: string;
  isAddingToCart: boolean;
}

const ProductActions = ({ 
  onAddToCart, 
  price, 
  quantity, 
  productName,
  currency = "AED",
  isAddingToCart
}: ProductActionsProps) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const { toast } = useToast();

  const handleToggleWishlist = () => {
    setIsWishlisted(!isWishlisted);
    toast({
      title: isWishlisted ? "Removed from wishlist" : "Added to wishlist",
      description: isWishlisted ? `${productName} removed from your wishlist` : `${productName} added to your wishlist`,
      duration: 3000,
    });
  };

  return (
    <motion.div 
      className="flex flex-col gap-4 mb-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button 
        className="relative w-full h-12 bg-brand-green text-white uppercase text-sm tracking-wider hover:bg-brand-lightGreen transition-colors rounded-sm overflow-hidden"
        onClick={onAddToCart}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.98 }}
        disabled={isAddingToCart}
      >
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 1 }}
          animate={{ opacity: isAddingToCart ? 0 : 1 }}
        >
          Add to bag — {price * quantity} {currency}
        </motion.div>
        
        <motion.div 
          className="absolute inset-0 flex items-center justify-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ 
            opacity: isAddingToCart ? 1 : 0,
            y: isAddingToCart ? 0 : 20
          }}
        >
          <Check className="mr-2" size={18} /> Added to bag
        </motion.div>
      </motion.button>
      
      <div className="flex gap-4">
        <motion.button 
          className={`flex-1 h-11 border ${isWishlisted ? 'bg-pink-50 border-pink-200' : 'border-gray-300'} flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors rounded-sm`}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={handleToggleWishlist}
        >
          <Heart size={16} className={isWishlisted ? 'fill-pink-500 text-pink-500' : ''} />
          <span>{isWishlisted ? 'Added to wishlist' : 'Add to wishlist'}</span>
        </motion.button>
        <motion.button 
          className="flex-1 h-11 border border-gray-300 flex items-center justify-center gap-2 text-sm hover:bg-gray-50 transition-colors rounded-sm"
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
        >
          <Share2 size={16} />
          <span>Share</span>
        </motion.button>
      </div>
      
      {/* Sharing options */}
      <motion.div 
        className="flex gap-4 mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <button className="text-sm text-gray-600 hover:text-brand-green transition-colors">
          WhatsApp
        </button>
        <button className="text-sm text-gray-600 hover:text-brand-green transition-colors">
          Email
        </button>
      </motion.div>
    </motion.div>
  );
};

export default ProductActions;
