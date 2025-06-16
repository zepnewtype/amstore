import { useState, useEffect } from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const slides = [
  {
    id: 1,
    image: 'https://ampriomilano.com/cdn/shop/files/Baci_Milano_ORTIGIA_outdoor_12_800x.jpg?v=1746214910',
    title: 'Fall/Winter Collection',
    subtitle: 'LUXURY TABLEWARE',
    cta: 'Explore Collection',
    link: '/collections/winter'
  },
  {
    id: 2,
    image: 'https://ampriomilano.com/cdn/shop/files/AMAZZONIA_600x.jpg?v=1733497346',
    title: 'Premium Melamine',
    subtitle: 'CRAFTED WITH PASSION',
    cta: 'Shop Now',
    link: '/shop'
  },
  {
    id: 3,
    image: 'https://ampriomilano.com/cdn/shop/files/SET_TABLE_3_800x.jpg?v=1708334587',
    title: 'Artisan Home Decor',
    subtitle: 'HANDMADE EXCELLENCE',
    cta: 'Discover More',
    link: '/collections/accessories'
  }
];

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

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
                <h2 className="uppercase text-base tracking-[0.2em] mb-3 font-medium">{slide.subtitle}</h2>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light mb-6">{slide.title}</h1>
                <Link to={slide.link} className="group inline-flex items-center">
                  <span className="mr-2 uppercase text-base tracking-wider border-b border-white pb-1 transition-all group-hover:border-gold-DEFAULT">{slide.cta}</span>
                  <ArrowRight size={18} className="transition-transform group-hover:translate-x-2" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Slide indicators */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="container-custom max-w-[1600px]">
          <div className="flex space-x-3">
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-12 h-1 transition-all ${
                  index === currentSlide ? 'bg-white' : 'bg-white/40'
                }`}
                aria-label={`Go to slide ${index + 1}`}
              ></button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
