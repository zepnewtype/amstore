import { useState, useEffect, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Phone, Truck, ChevronDown } from 'lucide-react';
import Footer from './Footer';
import Cart from './Cart';
import CartIcon from './CartIcon';
import SmallLogo from './SmallLogo';
import { useToast } from "@/hooks/use-toast";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink
} from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import { Carousel, CarouselContent, CarouselItem } from "./ui/carousel"

interface LayoutProps {
  children: React.ReactNode;
}

// Throttle function для оптимизации scroll events
const throttle = (func: Function, delay: number) => {
  let timeoutId: NodeJS.Timeout;
  let lastExecTime = 0;
  return function (...args: any[]) {
    const currentTime = Date.now();
    
    if (currentTime - lastExecTime > delay) {
      func(...args);
      lastExecTime = currentTime;
    } else {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        func(...args);
        lastExecTime = Date.now();
      }, delay - (currentTime - lastExecTime));
    }
  };
};

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // Оптимизированный scroll handler с throttling
  const handleScroll = useCallback(
    throttle(() => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 50);
    }, 16), // ~60fps
    []
  );

  useEffect(() => {
    // Добавляем passive для улучшения производительности
    const options = { passive: true };
    window.addEventListener('scroll', handleScroll, options);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Announcement Bar - убираем анимации carousel на мобильных */}
      <div className="bg-brand-green text-white py-2 md:py-4 px-4 text-xs md:text-sm">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0">
          {/* Мобильная версия: статичная, без carousel */}
          <div className="block md:hidden w-full text-center">
            <div className="flex items-center justify-center min-h-[28px]">
              <Truck size={16} className="mr-2" />
              <span>FAST SHIPPING IN UAE <a href="/shipping" className="underline ml-1">learn more</a></span>
            </div>
          </div>
          {/* Десктопная версия: обычный flex */}
          <div className="hidden md:flex w-full justify-between items-center">
            <div className="flex items-center">
              <Truck size={18} className="mr-2" />
              <div>FAST SHIPPING IN UAE <a href="/shipping" className="underline ml-1">learn more</a></div>
            </div>
            <div className="flex items-center">
              <Phone size={16} className="mr-2" />
              <div>+971 52 177 3471</div>
            </div>
          </div>
        </div>
      </div>

      <header
        className={`sticky top-0 left-0 right-0 z-40 bg-white border-b transition-shadow duration-200 will-change-transform ${
          isScrolled ? 'shadow-sm' : ''
        }`}
        style={{
          transform: 'translateZ(0)', // Форсируем GPU acceleration
        }}
      >
        <div className="container-custom flex flex-col items-center">
          {/* Компактный лого и навигация */}
          <div className={`w-full transition-all duration-300 ease-in-out ${
            isScrolled ? 'py-2' : 'py-6'
          }`}>
            {/* Лого - показываем компактную версию при скролле */}
            <div className={`flex justify-center transition-all duration-300 ${
              isScrolled ? 'mb-2' : 'mb-6'
            }`}>
              <Link to="/" className="flex items-center">
                {isScrolled ? (
                  <SmallLogo className="h-8" />
                ) : (
                  <img 
                    src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680" 
                    alt="Amprio Milano" 
                    className="h-20 md:h-28" 
                  />
                )}
              </Link>
            </div>

            <div className="w-full flex items-center justify-between">
              {/* Mobile menu button */}
              <button 
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden z-50 relative"
                aria-label="Toggle menu"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>

              {/* Desktop navigation - оптимизированная версия с dropdown */}
              <nav className="hidden md:flex justify-center flex-1">
                <ul className="flex items-center space-x-6">
                  <li>
                    <Link 
                      to="/" 
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                        location.pathname === '/' ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      New In
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/products" 
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                        location.pathname === '/products' ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      All Products
                    </Link>
                  </li>
                  
                  {/* Collections Dropdown */}
                  <li className="relative group">
                    <button 
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green flex items-center ${
                        location.pathname.includes('/collection') ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      Collections
                      <ChevronDown size={12} className="ml-1" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Link
                              to="/collections"
                              className="block p-3 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-sm font-medium text-black mb-1">All Collections</div>
                              <p className="text-xs text-gray-600">
                                Browse all our curated collections
                              </p>
                            </Link>
                          </div>
                          <div className="space-y-2">
                            <Link
                              to="/collection/tableware"
                              className="block p-2 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-sm font-medium">Tableware</div>
                              <p className="text-xs text-gray-600">Elegant dining solutions</p>
                            </Link>
                            <Link
                              to="/collection/outdoor"
                              className="block p-2 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-sm font-medium">Outdoor</div>
                              <p className="text-xs text-gray-600">Outdoor entertaining</p>
                            </Link>
                            <Link
                              to="/collection/home-decor"
                              className="block p-2 rounded-md hover:bg-gray-50 transition-colors"
                            >
                              <div className="text-sm font-medium">Interior accents</div>
                              <p className="text-xs text-gray-600">Interior accents</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link 
                      to="/tableware" 
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                        location.pathname.includes('/tableware') ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      Tableware
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/interior"
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                        location.pathname.includes('/interior') ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      Interior
                    </Link>
                  </li>
                  <li>
                    <Link 
                      to="/outdoor"
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                        location.pathname.includes('/outdoor') ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      Outdoor
                    </Link>
                  </li>

                  {/* Business Dropdown */}
                  <li className="relative group">
                    <button 
                      className="uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green flex items-center text-gray-700"
                    >
                      Business
                      <ChevronDown size={12} className="ml-1" />
                    </button>
                    
                    {/* Business Dropdown Menu */}
                    <div className="absolute top-full left-0 mt-2 w-96 bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <div className="p-4">
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <h3 className="text-sm font-semibold mb-3">HoReCa Solutions</h3>
                            <div className="space-y-2">
                              <Link
                                to="/business/restaurants"
                                className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7"/>
                                    <path d="M6 7v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2"/>
                                    <path d="M3 7h18"/>
                                    <path d="M9 14v2"/>
                                    <path d="M15 14v2"/>
                                  </svg>
                                </div>
                                <span className="text-sm">Restaurants</span>
                              </Link>
                              <Link
                                to="/business/hotels"
                                className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16"/>
                                    <path d="M5 12h14"/>
                                    <path d="M9 12v5"/>
                                    <path d="M15 12v5"/>
                                    <path d="M3 21h18"/>
                                  </svg>
                                </div>
                                <span className="text-sm">Hotels</span>
                              </Link>
                              <Link
                                to="/business/beach-clubs"
                                className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M2 22a20.3 20.3 0 0 1 20 0"/>
                                    <path d="M12 6a4 4 0 0 0-4 7h8a4 4 0 0 0-4-7z"/>
                                    <path d="M12 3v3"/>
                                    <path d="m6.82 7.3 2.12 2.13"/>
                                    <path d="m15.06 9.43 2.12-2.13"/>
                                  </svg>
                                </div>
                                <span className="text-sm">Beach Clubs</span>
                              </Link>
                              <Link
                                to="/business/yachts"
                                className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors"
                              >
                                <div className="w-6 h-6 mr-2 flex items-center justify-center">
                                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                                    <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1"/>
                                    <path d="m20 20-5-18h-4c0 3-2 5-5 5v3a7 7 0 0 0 7 7h9.5"/>
                                    <path d="M12 11h0"/>
                                  </svg>
                                </div>
                                <span className="text-sm">Yachts</span>
                              </Link>
                            </div>
                          </div>
                          <div>
                            <h3 className="text-sm font-semibold mb-3">Services</h3>
                            <div className="space-y-2">
                              <Link
                                to="/business/consultation"
                                className="block text-sm hover:text-brand-green transition-colors"
                              >
                                • Consultation
                              </Link>
                              <Link
                                to="/business/custom-orders"
                                className="block text-sm hover:text-brand-green transition-colors"
                              >
                                • Custom Orders
                              </Link>
                              <Link
                                to="/business/wholesale"
                                className="block text-sm hover:text-brand-green transition-colors"
                              >
                                • Wholesale Pricing
                              </Link>
                              <Link
                                to="/contact"
                                className="block text-sm hover:text-brand-green transition-colors"
                              >
                                • Contact Team
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>

                  <li>
                    <Link 
                      to="/contact" 
                      className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                        location.pathname === '/contact' ? 'text-brand-green' : 'text-gray-700'
                      }`}
                    >
                      Contact
                    </Link>
                  </li>
                </ul>
              </nav>

              {/* Icons */}
              <div className="flex items-center space-x-4">
                <Link to="/search" aria-label="Search" className="hover:text-brand-green transition-colors duration-200">
                  <Search size={20} />
                </Link>
                <Link to="/account" aria-label="Account" className="hover:text-brand-green transition-colors duration-200">
                  <User size={20} />
                </Link>
                <CartIcon />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile menu - убираем сложные анимации */}
        <div className={`md:hidden bg-white border-t transition-all duration-200 ${
          isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
        }`}>
          <nav className="container-custom py-4">
            <ul className="space-y-3">
              <li>
                <Link 
                  to="/" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname === '/' ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  New In
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname === '/products' ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  All Products
                </Link>
              </li>
              <li>
                <Link 
                  to="/collections" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname === '/collections' || location.pathname.startsWith('/collection/') ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  Collections
                </Link>
              </li>
              <li>
                <Link 
                  to="/tableware" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname === '/tableware' ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  Tableware
                </Link>
              </li>
              <li>
                <Link 
                  to="/interior" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname.includes('/interior') ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  Interior
                </Link>
              </li>
              <li>
                <Link 
                  to="/outdoor" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname === '/outdoor' ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  Outdoor
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  className={`block uppercase text-sm tracking-wide font-medium py-2 ${
                    location.pathname === '/contact' ? 'text-brand-green' : 'text-gray-700'
                  }`}
                >
                  Contact
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
      
      {/* Chatbot button */}
      <button 
        className="fixed bottom-6 right-6 bg-brand-green text-white w-12 h-12 rounded-full shadow-lg flex items-center justify-center hover:bg-brand-lightGreen transition-colors z-30"
        aria-label="Chat Support"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"></path>
        </svg>
      </button>
    </>
  );
};

export default Layout;
