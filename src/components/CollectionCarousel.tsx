import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';

interface Collection {
  id: number;
  name: string;
  image: string;
  link: string;
  description?: string;
}

interface CollectionCarouselProps {
  collections: Collection[];
}

const CollectionCarousel = ({ collections }: CollectionCarouselProps) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Auto-advance carousel every 4 seconds
  useEffect(() => {
    if (collections.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex(prev => (prev + 1) % collections.length);
    }, 4000);
    
    return () => clearInterval(interval);
  }, [collections.length]);
  
  // Show 3 items at once on desktop, 1 on mobile
  const getVisibleCollections = useCallback(() => {
    const itemsToShow = window.innerWidth >= 768 ? 3 : 1;
    const items = [];
    
    for (let i = 0; i < itemsToShow; i++) {
      const index = (currentIndex + i) % collections.length;
      items.push(collections[index]);
    }
    
    return items;
  }, [currentIndex, collections]);
  
  const [visibleCollections, setVisibleCollections] = useState(() => getVisibleCollections());
  
  useEffect(() => {
    setVisibleCollections(getVisibleCollections());
  }, [getVisibleCollections]);
  
  useEffect(() => {
    const handleResize = () => {
      setVisibleCollections(getVisibleCollections());
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [getVisibleCollections]);
  
  return (
    <div className="py-8">
      {/* Grid of visible collections - С ГРАДИЕНТОМ И БОЛЬШОЙ НАДПИСЬЮ */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {visibleCollections.map((collection, index) => (
          <div 
            key={`${collection.id}-${currentIndex}-${index}`}
            className="group cursor-pointer"
          >
            <div className="relative">
              {/* Square image container - С ГРАДИЕНТОМ СНИЗУ ВВЕРХ */}
              <div className="aspect-square relative overflow-hidden">
                <img 
                  src={collection.image} 
                  alt={collection.name}
                  className="w-full h-full object-cover"
                />
                {/* ГРАДИЕНТ СНИЗУ ВВЕРХ - от темного к прозрачному */}
                <div 
                  className="absolute inset-0"
                  style={{
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.4) 30%, rgba(0,0,0,0) 60%)'
                  }}
                ></div>
                
                {/* БОЛЬШАЯ НАДПИСЬ на изображении */}
                <div className="absolute inset-0 flex items-end p-6">
                  <h3 className="text-white font-serif text-4xl md:text-5xl font-bold leading-tight">
                    {collection.name}
                  </h3>
                </div>
              </div>
              
              {/* Content below image */}
              <div className="pt-4 text-center">
                <Link 
                  to={collection.link}
                  className="inline-block bg-brand-green text-white px-6 py-2 hover:bg-brand-lightGreen transition-colors duration-200 text-sm uppercase tracking-wide"
                  style={{ borderRadius: '2px' }}
                >
                  View Collection
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Simple dots indicator */}
      <div className="flex justify-center mt-8 space-x-2">
        {collections.map((_, index) => (
          <div
            key={index}
            className={`w-2 h-2 rounded-full transition-colors duration-300 ${
              index === currentIndex ? 'bg-brand-green' : 'bg-gray-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionCarousel;
