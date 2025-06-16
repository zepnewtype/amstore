import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Search, User, Phone, Truck, ChevronDown } from 'lucide-react';
import Footer from './Footer';
import Cart from './Cart';
import CartIcon from './CartIcon';
import { useToast } from "@/hooks/use-toast";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { toast } = useToast();

  // ИСПРАВЛЕННЫЙ scroll handler - скрыть лого при скролле
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50); // Скрываем лого при скролле
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);

  return (
    <>
      {/* Announcement Bar - ВЫСОКИЙ z-index */}
      <div className="bg-brand-green text-white py-2 md:py-4 px-4 text-xs md:text-sm relative z-50">
        <div className="container-custom flex flex-col md:flex-row justify-between items-center gap-1 md:gap-0">
          <div className="block md:hidden w-full text-center">
            <div className="flex items-center justify-center min-h-[28px]">
              <Truck size={16} className="mr-2" />
              <span>FAST SHIPPING IN UAE <a href="/shipping" className="underline ml-1">learn more</a></span>
            </div>
          </div>
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

      {/* Header с умным показом лого */}
      <header className="bg-white relative z-40">
        {/* Лого - показывается по умолчанию, скрывается при скролле */}
        {!isScrolled && (
          <div className="bg-white border-b">
            <div className="container-custom flex justify-center py-6">
              <Link to="/" className="flex items-center">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680" 
                  alt="Amprio Milano" 
                  className="h-20 md:h-28" 
                />
              </Link>
            </div>
          </div>
        )}

        {/* Навигация - становится фиксированной при скролле */}
        <div className={`bg-white border-b transition-all duration-200 ${isScrolled ? 'fixed top-0 left-0 right-0 z-40 shadow-md' : 'relative'}`}>
          <div className="container-custom">
            <div className="w-full py-4">
              <div className="w-full flex items-center justify-between">
                {/* Mobile menu button */}
                <button 
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="md:hidden z-50 relative"
                  aria-label="Toggle menu"
                >
                  {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>

                {/* Desktop navigation */}
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
                    
                    {/* Collections Dropdown - РАСШИРЕННАЯ картинка */}
                    <li className="relative group">
                      <button 
                        className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green flex items-center ${
                          location.pathname.includes('/collection') ? 'text-brand-green' : 'text-gray-700'
                        }`}
                      >
                        Collections
                        <ChevronDown size={12} className="ml-1" />
                      </button>
                      
                      {/* РАСШИРЕННЫЙ Dropdown */}
                      <div 
                        className="absolute top-full left-0 mt-2 w-[500px] bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                        style={{
                          willChange: 'opacity, visibility',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="flex">
                          {/* РАСШИРЕННАЯ картинка */}
                          <div className="w-2/5 relative">
                            <div 
                              className="h-full bg-cover bg-center rounded-l-md relative min-h-[200px]"
                              style={{
                                backgroundImage: `url('https://ampriomilano.com/cdn/shop/files/MAMMA_MIA_table_2000x.jpg?v=1743609613')`,
                                willChange: 'transform'
                              }}
                            >
                              {/* Затемнение */}
                              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-l-md"></div>
                              {/* ЗАГОЛОВОК на картинке */}
                              <div className="absolute inset-0 flex items-end p-4">
                                <h3 className="text-white font-serif text-lg">Collections</h3>
                              </div>
                            </div>
                          </div>
                          
                          {/* Меню справа */}
                          <div className="w-3/5 p-4">
                            <div className="space-y-3">
                              <Link to="/collections" className="block p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <div className="text-sm font-medium text-black mb-1">All Collections</div>
                                <p className="text-xs text-gray-600">Browse all our curated collections</p>
                              </Link>
                              
                              <Link to="/collection/tableware" className="block p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <div className="text-sm font-medium">Tableware</div>
                                <p className="text-xs text-gray-600">Elegant dining solutions</p>
                              </Link>
                              
                              <Link to="/collection/outdoor" className="block p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <div className="text-sm font-medium">Outdoor</div>
                                <p className="text-xs text-gray-600">Outdoor entertaining</p>
                              </Link>
                              
                              <Link to="/collection/home-decor" className="block p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <div className="text-sm font-medium">Home Decor</div>
                                <p className="text-xs text-gray-600">Decorative accessories</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    {/* Business Dropdown - ИЗМЕНЕН на B2B Solutions */}
                    <li className="relative group">
                      <button 
                        className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green flex items-center ${
                          location.pathname.includes('/business') ? 'text-brand-green' : 'text-gray-700'
                        }`}
                      >
                        Business
                        <ChevronDown size={12} className="ml-1" />
                      </button>
                      
                      <div 
                        className="absolute top-full left-0 mt-2 w-[520px] bg-white shadow-lg border rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50"
                        style={{
                          willChange: 'opacity, visibility',
                          backfaceVisibility: 'hidden'
                        }}
                      >
                        <div className="flex">
                          {/* РАСШИРЕННАЯ картинка */}
                          <div className="w-2/5 relative">
                            <div 
                              className="h-full bg-cover bg-center rounded-l-md relative min-h-[280px]"
                              style={{
                                backgroundImage: `url('https://ampriomilano.com/cdn/shop/files/MAMMA_MIA_table_2000x.jpg?v=1743609613')`,
                                willChange: 'transform'
                              }}
                            >
                              <div className="absolute inset-0 bg-black bg-opacity-40 rounded-l-md"></div>
                              {/* ИЗМЕНЕН заголовок на B2B Solutions */}
                              <div className="absolute inset-0 flex items-end p-4">
                                <h3 className="text-white font-serif text-lg">B2B Solutions</h3>
                              </div>
                            </div>
                          </div>
                          
                          {/* Меню справа */}
                          <div className="w-3/5 p-4">
                            <div className="space-y-2">
                              <Link to="/business/restaurants" className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <svg className="w-4 h-4 mr-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z"/>
                                </svg>
                                <div>
                                  <div className="text-sm font-medium">Restaurants</div>
                                  <p className="text-xs text-gray-600">Professional dining solutions</p>
                                </div>
                              </Link>
                              
                              <Link to="/business/hotels" className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <svg className="w-4 h-4 mr-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z"/>
                                </svg>
                                <div>
                                  <div className="text-sm font-medium">Hotels</div>
                                  <p className="text-xs text-gray-600">Luxury hospitality tableware</p>
                                </div>
                              </Link>
                              
                              <Link to="/business/beach-clubs" className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <svg className="w-4 h-4 mr-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M3 6a3 3 0 013-3h10a1 1 0 01.8 1.6L14.25 8l2.55 3.4A1 1 0 0116 13H6a1 1 0 00-1 1v3a1 1 0 11-2 0V6z" clipRule="evenodd"/>
                                </svg>
                                <div>
                                  <div className="text-sm font-medium">Beach Clubs</div>
                                  <p className="text-xs text-gray-600">Outdoor dining experiences</p>
                                </div>
                              </Link>
                              
                              <Link to="/business/yachts" className="flex items-center p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <svg className="w-4 h-4 mr-3 text-brand-green" fill="currentColor" viewBox="0 0 20 20">
                                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                                </svg>
                                <div>
                                  <div className="text-sm font-medium">Yachts</div>
                                  <p className="text-xs text-gray-600">Marine dining excellence</p>
                                </div>
                              </Link>
                            </div>
                            
                            <div className="mt-3 pt-3 border-t">
                              <Link to="/business/services" className="block p-2 rounded-md hover:bg-gray-50 transition-colors">
                                <div className="text-sm font-medium">Services</div>
                                <p className="text-xs text-gray-600">Consultation & custom solutions</p>
                              </Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </li>

                    <li>
                      <Link 
                        to="/about" 
                        className={`uppercase text-xs tracking-wide font-medium transition-colors duration-200 hover:text-brand-green ${
                          location.pathname === '/about' ? 'text-brand-green' : 'text-gray-700'
                        }`}
                      >
                        About
                      </Link>
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
                  <Search size={20} className="cursor-pointer hover:text-brand-green transition-colors" />
                  <User size={20} className="cursor-pointer hover:text-brand-green transition-colors" />
                  <CartIcon onOpenCart={() => setIsCartOpen(true)} />
                </div>
              </div>
            </div>
          </div>

          {/* Mobile menu */}
          {isMenuOpen && (
            <div className="md:hidden fixed inset-0 bg-white z-50">
              <div className="flex justify-between items-center p-4 border-b">
                <img 
                  src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680" 
                  alt="Amprio Milano" 
                  className="h-12" 
                />
                <button onClick={() => setIsMenuOpen(false)}>
                  <X size={24} />
                </button>
              </div>
              <nav className="p-4">
                <ul className="space-y-4">
                  <li><Link to="/" className="block py-2 text-lg">New In</Link></li>
                  <li><Link to="/products" className="block py-2 text-lg">All Products</Link></li>
                  <li><Link to="/collections" className="block py-2 text-lg">Collections</Link></li>
                  <li><Link to="/business" className="block py-2 text-lg">Business</Link></li>
                  <li><Link to="/about" className="block py-2 text-lg">About</Link></li>
                  <li><Link to="/contact" className="block py-2 text-lg">Contact</Link></li>
                </ul>
              </nav>
            </div>
          )}
        </div>

        {/* Отступ сверху когда меню фиксированное */}
        {isScrolled && <div className="h-16"></div>}
      </header>

      {/* Main content */}
      <main className="min-h-screen">
        {children}
      </main>

      <Footer />
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />

      {/* Chatbot button */}
      <div className="fixed bottom-6 right-6 z-50">
        <button 
          className="bg-brand-green text-white p-4 rounded-full shadow-lg hover:bg-brand-lightGreen transition-colors"
          onClick={() => toast({ title: "Chat support coming soon!" })}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z"/>
          </svg>
        </button>
      </div>
    </>
  );
};

export default Layout;
