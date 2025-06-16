import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import { useCart } from './Cart';

interface LineProduct {
  id: number;
  name: string;
  price: number;
  image: string;
  itemNo?: string;
  diameter?: string;
  inStock?: number;
  deliveryTime?: string;
  currency?: string;
  description?: string;
  handle: string;
}

interface ProductLineSectionProps {
  products: LineProduct[];
  title: string;
}

const ProductLineSection = ({ products, title }: ProductLineSectionProps) => {
  const { addToCart } = useCart();
  // Для каждого товара храним свой quantity
  const [quantities, setQuantities] = useState<{ [id: number]: number }>(
    Object.fromEntries(products.map((p) => [p.id, 1]))
  );

  const handleQuantityChange = (id: number, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta)
    }));
  };

  const handleAddToCart = (item: LineProduct) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
      quantity: quantities[item.id] || 1
    });
  };

  return (
    <div className="mt-16">
      <div className="relative mb-8">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-200"></div>
        </div>
        <div className="relative flex justify-center text-center">
          <h2 className="bg-white px-6 text-xl font-serif text-brand-green">{title}</h2>
        </div>
      </div>
      
      <div className="space-y-8">
        {products.map((item) => (
          <div key={item.id} className="border-t border-b border-gray-200 py-6 animate-fade-in">
            <div className="flex flex-col md:flex-row">
              {/* Product image */}
              <div className="w-full md:w-1/4 md:pr-6">
                <Link to={`/products/${item.handle}`}>
                  <img 
                    src={item.image} 
                    alt={item.name} 
                    className="w-full h-auto object-contain"
                  />
                </Link>
              </div>
              
              {/* Product details */}
              <div className="w-full md:w-3/4 mt-4 md:mt-0">
                <Link to={`/products/${item.handle}`} className="block mb-2">
                  <h3 className="text-base font-medium hover:text-brand-green transition-colors">{item.name}</h3>
                </Link>
                {item.description && (
                  <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                )}
                <div className="flex flex-col sm:flex-row justify-between">
                  <div>
                    {item.itemNo && (
                      <p className="text-sm text-gray-500 mb-1">Item no. {item.itemNo}</p>
                    )}
                    {item.diameter && (
                      <p className="text-sm text-gray-500 mb-3">Ø {item.diameter}</p>
                    )}
                    
                    {/* Availability */}
                    {item.inStock && (
                      <div className="flex items-center mb-1 text-sm">
                        <span className="text-brand-green mr-1">✓</span>
                        <span>{item.inStock} in stock, delivery time approx. {item.deliveryTime}</span>
                      </div>
                    )}
                    <p className="text-sm text-gray-500 mb-3">Otherwise approx. 2 months delivery time</p>
                  </div>
                  
                  {/* Price and actions */}
                  <div className="mt-4 sm:mt-0">
                    <div className="flex flex-col sm:items-end">
                      <span className="font-medium text-lg mb-3">{item.currency || "AED"} {item.price}</span>
                      
                      <div className="flex items-center gap-4">
                        <div className="flex items-center border border-gray-300">
                          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100" onClick={() => handleQuantityChange(item.id, -1)}>-</button>
                          <span className="w-8 h-8 flex items-center justify-center">{quantities[item.id] || 1}</span>
                          <button className="w-8 h-8 flex items-center justify-center hover:bg-gray-100" onClick={() => handleQuantityChange(item.id, 1)}>+</button>
                        </div>
                        <button className="bg-brand-green text-white py-2 px-4 hover:bg-brand-lightGreen transition-colors" onClick={() => handleAddToCart(item)}>
                          Add to bag
                        </button>
                      </div>
                      
                      {/* Wish list */}
                      <div className="mt-3">
                        <button className="text-sm text-brand-green flex items-center gap-1">
                          <Heart size={16} />
                          <span>Add to wish list</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductLineSection;
