import { Link } from 'react-router-dom';
import { Instagram, Facebook, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-brand-green text-white pt-10 md:pt-16 pb-6">
      <div className="container-custom">
        {/* Footer top section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10 mb-10 md:mb-12">
          {/* Brand column */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="https://cdn.shopify.com/s/files/1/0592/5152/3702/files/AMP_LOGO_FULL.svg?v=1735227680" 
                alt="Amprio Milano" 
                className="h-12 md:h-16 brightness-0 invert"
              />
            </Link>
            <p className="mt-3 md:mt-4 text-sm text-white/90 leading-relaxed">
              Luxury tableware and home decor delivering timeless elegance and contemporary design since 2008.
            </p>
            <div className="flex mt-5 md:mt-6 space-x-5">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors p-1 -ml-1" aria-label="Follow on Instagram">
                <Instagram size={20} />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors p-1" aria-label="Follow on Facebook">
                <Facebook size={20} />
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gold-DEFAULT transition-colors p-1" aria-label="Follow on LinkedIn">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Collections column */}
          <div>
            <h3 className="font-medium uppercase tracking-wider mb-4 md:mb-6 text-base">Collections</h3>
            <ul className="space-y-1 md:space-y-3">
              <li><Link to="/collections/tableware" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Tableware</Link></li>
              <li><Link to="/collections/kitchenware" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Kitchenware</Link></li>
              <li><Link to="/collections/accessories" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Accessories</Link></li>
              <li><Link to="/collections/decor" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Decor</Link></li>
              <li><Link to="/collections/new-arrivals" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">New Arrivals</Link></li>
            </ul>
          </div>

          {/* Information column */}
          <div>
            <h3 className="font-medium uppercase tracking-wider mb-4 md:mb-6 text-base">Information</h3>
            <ul className="space-y-1 md:space-y-3">
              <li><Link to="/about" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Contact Us</Link></li>
              <li><Link to="/shipping" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Shipping Policy</Link></li>
              <li><Link to="/returns" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Returns & Exchanges</Link></li>
              <li><Link to="/privacy" className="text-sm text-white/90 hover:text-gold-DEFAULT transition-colors inline-block py-2 md:py-0">Privacy Policy</Link></li>
            </ul>
          </div>

          {/* Contact Info Column */}
          <div>
            <h3 className="font-medium uppercase tracking-wider mb-4 md:mb-6 text-base">Contact Us</h3>
            <ul className="space-y-4 text-sm text-white/90">
              <li className="flex items-start">
                <Phone size={18} className="mr-2 flex-shrink-0 mt-1" />
                <span>
                  <strong className="block mb-1">Phone</strong>
                  <a href="tel:+97152177347" className="hover:text-gold-DEFAULT transition-colors">+971 52 177 3471</a>
                </span>
              </li>
              <li className="flex items-start">
                <Mail size={18} className="mr-2 flex-shrink-0 mt-1" />
                <span>
                  <strong className="block mb-1">Email</strong>
                  <a href="mailto:info@amprio.ae" className="hover:text-gold-DEFAULT transition-colors">info@amprio.ae</a>
                </span>
              </li>
              <li className="flex items-start">
                <MapPin size={18} className="mr-2 flex-shrink-0 mt-1" />
                <span>
                  <strong className="block mb-1">Office</strong>
                  1802 Ontario Tower, Business Bay<br/>Dubai UAE
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Footer bottom section */}
        <div className="pt-6 border-t border-white/20 flex flex-col md:flex-row justify-between items-center">
          <p className="text-xs text-white/70">© {currentYear} Amprio Milano. All rights reserved.</p>
          <div className="flex space-x-4 md:space-x-6 mt-4 md:mt-0">
            <Link to="/terms" className="text-xs text-white/70 hover:text-gold-DEFAULT transition-colors py-1">Terms & Conditions</Link>
            <Link to="/privacy" className="text-xs text-white/70 hover:text-gold-DEFAULT transition-colors py-1">Privacy Policy</Link>
            <Link to="/sitemap" className="text-xs text-white/70 hover:text-gold-DEFAULT transition-colors py-1">Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
