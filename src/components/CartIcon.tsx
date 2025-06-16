import { useState } from 'react';
import { ShoppingBag } from 'lucide-react';
import { useCart } from './Cart';
import Cart from './Cart';

interface CartIconProps {
  onOpenCart?: () => void;
}

const CartIcon = ({ onOpenCart }: CartIconProps) => {
  const { itemCount } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleCartClick = () => {
    if (onOpenCart) {
      onOpenCart();
    } else {
      setIsCartOpen(true);
    }
  };

  return (
    <div className="relative">
      <button 
        className="p-2 text-gray-800 hover:text-brand-green transition-colors"
        aria-label="View cart"
        onClick={handleCartClick}
      >
        <ShoppingBag size={24} />
        {itemCount > 0 && (
          <span className="absolute -top-1 -right-1 flex items-center justify-center w-5 h-5 bg-brand-green text-white text-xs rounded-full">
            {itemCount}
          </span>
        )}
      </button>
      
      {!onOpenCart && <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />}
    </div>
  );
};

export default CartIcon;
