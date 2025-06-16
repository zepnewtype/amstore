import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// Shopify Hero Slide interface
interface HeroSlide {
  id: string;
  title: string;
  subtitle: string;
  description?: string;
  image: string;
  link: string;
  cta: string;
  isActive?: boolean;
}

// Props interface for Shopify integration
interface HeroProps {
  slides?: HeroSlide[];
  autoSlide?: boolean;
  slideInterval?: number;
}

// Default slides - will be replaced by Shopify data
const defaultSlides: HeroSlide[] = [
  {
    id: 'slide-1',
    title: 'Milano\nElegance',
    subtitle: 'NEW COLLECTION',
    description: 'Discover our premium tableware collection',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2070&auto=format&fit=crop',
    link: '/collection/milano',
    cta: 'DISCOVER NOW'
  },
  {
    id: 'slide-2', 
    title: 'Artisan\nCraftsmanship',
    subtitle: 'HANDCRAFTED LUXURY',
    description: 'Each piece tells a story of Italian excellence',
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68412?q=80&w=2070&auto=format&fit=crop',
    link: '/collection/artisan',
    cta: 'EXPLORE COLLECTION'
  },
  {
    id: 'slide-3',
    title: 'Business\nSolutions', 
    subtitle: 'FOR PROFESSIONALS',
    description: 'Premium tableware for hotels, restaurants & yachts',
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?q=80&w=2070&auto=format&fit=crop',
    link: '/business',
    cta: 'VIEW SOLUTIONS'
  }
];

const Hero = ({ 
  slides = defaultSlides, 
  autoSlide = true, 
  slideInterval = 6000 
}: HeroProps) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  // Auto-advance slides
  useEffect(() => {
    if (!autoSlide || slides.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, slideInterval);
    
    return () => clearInterval(interval);
  }, [slides.length, autoSlide, slideInterval]);

  // Function to fetch slides from Shopify (ready for implementation)
  const fetchSlidesFromShopify = async () => {
    setIsLoading(true);
    try {
      // TODO: Implement Shopify Storefront API call
      // const response = await fetch('/api/shopify/hero-slides');
      // const shopifySlides = await response.json();
      // return shopifySlides;
      
      // For now, return default slides
      return defaultSlides;
    } catch (error) {
      console.error('Error fetching Shopify slides:', error);
      return defaultSlides;
    } finally {
      setIsLoading(false);
    }
  };

  // Loading state
  if (isLoading) {
    return (
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden bg-gray-100">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-brand-green mx-auto mb-4"></div>
            <p className="text-gray-500">Loading...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="absolute inset-0 bg-cover bg-center"
            style={{ 
              backgroundImage: `url(${slide.image})`,
              backgroundPosition: 'center',
              backgroundSize: 'cover'
            }}
          >
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>
          </div>
          
          <div className="relative h-full flex items-center">
            <div className="container-custom max-w-[1600px] w-full">
              <div className="max-w-lg text-white animate-fade-in">
                <h2 className="uppercase text-base tracking-[0.2em] mb-3 font-medium text-brand-green">
                  {slide.subtitle}
                </h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6 leading-tight">
                  {slide.title.split('\n').map((line, i) => (
                    <span key={i} className="block">{line}</span>
                  ))}
                </h1>
                {slide.description && (
                  <p className="text-lg md:text-xl text-white/90 mb-8 max-w-md leading-relaxed">
                    {slide.description}
                  </p>
                )}
                <Link to={slide.link} className="group inline-flex items-center">
                  <span className="mr-2 uppercase text-base tracking-wider border-b border-white pb-1 transition-all group-hover:border-brand-green group-hover:text-brand-green">
                    {slide.cta}
                  </span>
                  <ArrowRight 
                    size={18} 
                    className="transition-all group-hover:translate-x-2 group-hover:text-brand-green" 
                  />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide 
                ? 'bg-brand-green scale-125' 
                : 'bg-white bg-opacity-50 hover:bg-opacity-75'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      {autoSlide && (
        <div className="absolute bottom-0 left-0 w-full h-1 bg-black bg-opacity-20">
          <div 
            className="h-full bg-brand-green transition-all duration-100"
            style={{ 
              width: `${((currentSlide + 1) / slides.length) * 100}%` 
            }}
          />
        </div>
      )}
    </section>
  );
};

export default Hero;
