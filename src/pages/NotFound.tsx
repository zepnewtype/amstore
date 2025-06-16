import { useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import ProductGrid from "../components/ProductGrid";
import Layout from "../components/Layout";

// Mock recommended products
const recommendedProducts = [
  {
    id: 1,
    name: "Milano Dinner Plate - Versailles",
    price: 120,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
  },
  {
    id: 2,
    name: "Ecume White presentation plate",
    price: 111.04,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
  },
  {
    id: 6,
    name: "Porcelain Teacup - Azure",
    price: 65,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    isNew: true,
  },
];

const NotFound = () => {
  const location = useLocation();
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
    // Trigger animation after component mounts
    setAnimateIn(true);
  }, [location.pathname]);

  return (
    <Layout>
      <div className="container-custom py-16 md:py-24">
        <div className={`transition-opacity duration-700 ${animateIn ? "opacity-100" : "opacity-0"}`}>
          <div className="max-w-2xl mx-auto text-center mb-16">
            <h1 className="text-7xl md:text-9xl font-serif mb-6">404</h1>
            <p className="text-2xl text-gray-600 mb-8">Page not found</p>
            <p className="text-gray-500 mb-8">
              The page you are looking for might have been removed or is temporarily unavailable.
            </p>
            <Link 
              to="/" 
              className="inline-flex items-center text-brand-green hover:underline transition-colors"
            >
              <ArrowLeft size={18} className="mr-2" />
              Return to Home Page
            </Link>
          </div>
          
          <div className="mt-16">
            <h2 className="text-2xl font-serif text-center mb-10">You might also like</h2>
            <ProductGrid products={recommendedProducts} columns={3} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NotFound;
