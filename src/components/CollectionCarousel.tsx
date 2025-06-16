
import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [startX, setStartX] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? collections.length - 1 : prevIndex - 1
    );
  };
  
  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === collections.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
    setIsDragging(true);
    if ('touches' in e) {
      setStartX(e.touches[0].clientX);
    } else {
      setStartX(e.clientX);
    }
  };
  
  const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
    if (!isDragging) return;
    
    let currentX;
    if ('touches' in e) {
      currentX = e.touches[0].clientX;
    } else {
      currentX = e.clientX;
    }
    
    const diff = startX - currentX;
    
    if (Math.abs(diff) > 50) {
      if (diff > 0) {
        handleNext();
      } else {
        handlePrev();
      }
      setIsDragging(false);
    }
  };
  
  const handleTouchEnd = () => {
    setIsDragging(false);
  };
  
  // Auto-advance the carousel every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 5000);
    
    return () => clearInterval(interval);
  }, [collections.length]);
  
  return (
    <div className="relative overflow-hidden py-10">
      <div
        ref={carouselRef}
        className="flex transition-transform duration-500 ease-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onMouseDown={handleTouchStart}
        onMouseMove={handleTouchMove}
        onMouseUp={handleTouchEnd}
        onMouseLeave={handleTouchEnd}
      >
        {collections.map((collection, index) => (
          <motion.div
            key={collection.id}
            className="min-w-full px-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: index === currentIndex ? 1 : 0.7 }}
            transition={{ duration: 0.5 }}
          >
            <Link to={collection.link} className="block">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div className="overflow-hidden rounded-lg">
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="w-full h-[350px] object-cover transition-transform duration-700 hover:scale-105"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-3xl font-serif mb-3">{collection.name}</h3>
                  {collection.description && (
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {collection.description}
                    </p>
                  )}
                  <Link 
                    to={collection.link}
                    className="inline-block bg-brand-green text-white px-6 py-3 hover:bg-brand-lightGreen transition-colors"
                  >
                    View Collection
                  </Link>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </div>
      
      {/* Navigation arrows */}
      <button
        onClick={handlePrev}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition-colors"
        aria-label="Previous collection"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={handleNext}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 rounded-full p-2 shadow hover:bg-white transition-colors"
        aria-label="Next collection"
      >
        <ChevronRight size={24} />
      </button>
      
      {/* Dots indicator */}
      <div className="flex justify-center mt-6 space-x-2">
        {collections.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-3 h-3 rounded-full ${
              currentIndex === index ? 'bg-brand-green' : 'bg-gray-300'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default CollectionCarousel;
