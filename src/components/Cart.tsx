
import { useState, useEffect, createContext, useContext } from 'react';
import { Link } from 'react-router-dom';
import { X, ShoppingBag } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

// Create context for cart state
export const CartContext = createContext({
  items: [] as CartItem[],
  addToCart: (item: CartItem) => {},
  removeItem: (id: number) => {},
  updateQuantity: (id: number, quantity: number) => {},
  itemCount: 0,
});

export const useCart = () => useContext(CartContext);

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [items, setItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Milano Dinner Plate - Versailles",
      price: 120,
      image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
      quantity: 1
    },
    {
      id: 2,
      name: "Ecume White presentation plate",
      price: 111.04,
      image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
      quantity: 2
    }
  ]);
  const { toast } = useToast();

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (item: CartItem) => {
    const existingItem = items.find(i => i.id === item.id);
    
    if (existingItem) {
      setItems(items.map(i => 
        i.id === item.id 
          ? { ...i, quantity: i.quantity + item.quantity } 
          : i
      ));
    } else {
      setItems([...items, item]);
    }
    
    toast({
      title: "Item added to cart",
      description: `${item.name} has been added to your cart.`,
      duration: 3000,
    });
  };

  const updateQuantity = (id: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setItems(items.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };

  const removeItem = (id: number) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ items, addToCart, removeItem, updateQuantity, itemCount }}>
      {children}
    </CartContext.Provider>
  );
};

const Cart = ({ isOpen, onClose }: CartProps) => {
  const { items, updateQuantity, removeItem, itemCount } = useCart();

  // Calculate total
  const subtotal = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shipping = 20;
  const total = subtotal + shipping;

  // Prevent body scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }
    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/50 overflow-hidden">
      <div 
        className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-lg transform transition-transform ease-in-out duration-300" 
        style={{ transform: isOpen ? 'translateX(0)' : 'translateX(100%)' }}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <h2 className="text-lg font-medium">Your Cart ({itemCount} items)</h2>
            <button 
              onClick={onClose}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <X size={20} />
            </button>
          </div>
          
          {/* Body */}
          <div className="flex-grow overflow-y-auto p-4">
            {items.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center">
                <ShoppingBag size={64} className="text-gray-300 mb-4" />
                <p className="text-gray-500 mb-6">Your cart is empty</p>
                <Link 
                  to="/products" 
                  className="text-brand-green underline hover:text-brand-lightGreen"
                  onClick={onClose}
                >
                  Continue shopping
                </Link>
              </div>
            ) : (
              <ul className="space-y-6">
                {items.map(item => (
                  <li key={item.id} className="flex gap-4">
                    <div className="w-20 h-20 bg-gray-100 flex-shrink-0">
                      <img 
                        src={item.image} 
                        alt={item.name} 
                        className="w-full h-full object-cover"
                      />
                    </div>
                    
                    <div className="flex-grow">
                      <Link 
                        to={`/product/${item.id}`}
                        onClick={onClose}
                        className="font-medium hover:text-brand-green transition-colors"
                      >
                        {item.name}
                      </Link>
                      
                      <div className="flex items-center mt-2">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                        >
                          -
                        </button>
                        <span className="w-10 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 border border-gray-300 flex items-center justify-center"
                        >
                          +
                        </button>
                        
                        <div className="ml-auto">
                          {item.price} AED
                        </div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="text-gray-400 hover:text-red-500 transition-colors"
                    >
                      <X size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
          
          {/* Footer */}
          <div className="border-t border-gray-200 p-4">
            {items.length > 0 && (
              <>
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>{subtotal.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>{shipping.toFixed(2)} AED</span>
                  </div>
                  <div className="flex justify-between font-medium text-lg pt-2 border-t">
                    <span>Total</span>
                    <span>{total.toFixed(2)} AED</span>
                  </div>
                </div>
                
                <Link 
                  to="/checkout" 
                  className="w-full bg-brand-green text-white py-3 text-center block hover:bg-brand-lightGreen transition-colors"
                  onClick={onClose}
                >
                  Proceed to Checkout
                </Link>
                
                <button 
                  onClick={onClose}
                  className="w-full py-2 text-center text-gray-600 mt-3 hover:underline"
                >
                  Continue Shopping
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
