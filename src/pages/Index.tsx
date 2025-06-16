
import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import CollectionCarousel from '../components/CollectionCarousel';
import TableSettingVisualizer from '../components/TableSettingVisualizer';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const featuredProducts = [
  {
    id: 1,
    name: "Dinner Plate - Ortigia Collection",
    price: 120,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    hoverImage: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    isNew: true
  },
  {
    id: 2,
    name: "Coffee Cup with Saucer - Milano",
    price: 85,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    hoverImage: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234"
  },
  {
    id: 3,
    name: "Dessert Bowl - Ortigia Collection",
    price: 95,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    hoverImage: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    isNew: true
  },
  {
    id: 4,
    name: "Wine Glass Set - Crystal Collection",
    price: 110,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    hoverImage: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    isSale: true,
    salePrice: 90
  }
];

// Collection carousel data
const collections = [
  {
    id: 1,
    name: "Ortigia Collection",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    link: "/collection/ortigia",
    description: "The new and elegant Ortigia Collection creates a perfect balance between style and functionality."
  },
  {
    id: 2,
    name: "Versailles Collection",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    link: "/collection/versailles",
    description: "Timeless elegance inspired by the grandeur of French palaces, perfect for formal dining experiences."
  },
  {
    id: 3,
    name: "Milano Collection",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    link: "/collection/milano",
    description: "Modern sophistication with an Italian flair, designed for contemporary dining spaces."
  },
  {
    id: 4,
    name: "Coastal Collection",
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    link: "/collection/coastal",
    description: "Inspired by the Mediterranean coastline, featuring fresh blues and sandy neutrals."
  }
];

// HoReCa products
const horecaProducts = [
  {
    id: 5,
    name: "Restaurant Dinner Plate",
    price: 420,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    category: "restaurant"
  },
  {
    id: 6,
    name: "Hotel Coffee Cup",
    price: 260,
    image: "https://ampriomilano.com/cdn/shop/files/PLAR.MICA04_3efcc2df-8b59-40e7-aa67-0bc005720fb8_400x.png?v=1746463780",
    category: "hotel"
  },
  {
    id: 7,
    name: "Beach Club Tumbler",
    price: 190,
    image: "https://ampriomilano.com/cdn/shop/files/BOL1.MAM03_34bf36bb-3199-4c0b-bdc2-8ca64dbf3a12_400x.png?v=1746406880",
    category: "beach"
  },
  {
    id: 8,
    name: "Yacht Wine Glasses",
    price: 350,
    image: "https://ampriomilano.com/cdn/shop/files/TS_MAM04_45100a99-1976-42f5-8721-ff4357d9d967_400x.png?v=1746406478",
    category: "yacht"
  }
];

// Animation variants
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: {
      duration: 0.6
    }
  }
};

const Index = () => {
  return (
    <Layout>
      <Hero />
      
      {/* Collection Carousel */}
      <section className="py-12">
        <div className="container-custom">
          <div className="text-center mb-6">
            <motion.h2 
              className="text-3xl md:text-4xl font-serif mb-2"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
            >
              Explore Our Collections
            </motion.h2>
            <motion.p 
              className="text-gray-600 max-w-2xl mx-auto"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              Browse our carefully curated collections, each designed to bring elegance and style to your home
            </motion.p>
          </div>
          
          <CollectionCarousel collections={collections} />
        </div>
      </section>
      
      {/* Featured products section */}
      <ProductGrid 
        products={featuredProducts} 
        title="Featured Products" 
        subtitle="Handpicked Selection"
      />
      
      {/* About Us section */}
      <motion.section 
        className="py-16 bg-fashion-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={{
          hidden: {},
          visible: {
            transition: {
              staggerChildren: 0.2
            }
          }
        }}
      >
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div variants={fadeInUp}>
              <img 
                src="https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234" 
                alt="Amprio Milano craftsmanship" 
                className="w-full h-auto rounded-lg shadow-lg" 
              />
            </motion.div>
            <div>
              <motion.span variants={fadeInUp} className="text-brand-green uppercase text-sm tracking-widest mb-2 inline-block">Our Heritage</motion.span>
              <motion.h2 variants={fadeInUp} className="text-4xl font-serif mb-6">The Amprio Milano Story</motion.h2>
              <motion.p variants={fadeInUp} className="text-gray-700 leading-relaxed mb-6">
                Founded in Milan in 2010, Amprio Milano combines Italian craftsmanship with modern design to create exceptional tableware and home accessories. Our products are crafted from the finest materials, each piece reflecting our commitment to quality and elegance.
              </motion.p>
              <motion.p variants={fadeInUp} className="text-gray-700 leading-relaxed mb-8">
                Today, Amprio Milano has become synonymous with sophisticated living, offering collections that transform everyday moments into special occasions. From intimate family gatherings to grand celebrations, our pieces add a touch of luxury to every table.
              </motion.p>
              <motion.div variants={fadeInUp}>
                <Link to="/about" className="group inline-flex items-center text-brand-green">
                  <span className="mr-2 uppercase text-sm tracking-wider border-b border-brand-green pb-1">Discover Our Story</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-2" />
                </Link>
              </motion.div>
            </div>
          </div>
        </div>
      </motion.section>
      
      {/* B2C and B2B Solutions */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Complete Solutions For Every Need</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Whether you're furnishing your home or your business, Amprio Milano offers premium products and services
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            {/* Consumer Solutions */}
            <div className="bg-white p-8 shadow-sm rounded-lg">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                  <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
                  <polyline points="9 22 9 12 15 12 15 22"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">For Your Home</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Premium tableware for daily use and special occasions</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Elegant home decor to elevate your living spaces</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Durable outdoor collections for entertaining</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Personalized shopping assistance</span>
                </li>
              </ul>
              <Link 
                to="/products" 
                className="inline-block bg-brand-green text-white px-6 py-3 hover:bg-brand-lightGreen transition-colors"
              >
                Shop Collections
              </Link>
            </div>
            
            {/* Business Solutions */}
            <div className="bg-white p-8 shadow-sm rounded-lg">
              <div className="mb-6 inline-flex items-center justify-center w-16 h-16 bg-brand-green/10 rounded-full">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                  <rect width="16" height="20" x="4" y="2" rx="2" ry="2"/>
                  <path d="M9 22v-4h6v4"/>
                  <path d="M8 6h.01"/>
                  <path d="M16 6h.01"/>
                  <path d="M12 6h.01"/>
                  <path d="M12 10h.01"/>
                  <path d="M8 10h.01"/>
                  <path d="M16 10h.01"/>
                  <path d="M12 14h.01"/>
                  <path d="M8 14h.01"/>
                  <path d="M16 14h.01"/>
                </svg>
              </div>
              <h3 className="text-2xl font-serif mb-4">For Your Business</h3>
              <ul className="space-y-3 mb-8">
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Commercial-grade tableware for restaurants & hotels</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Custom solutions for beach clubs & yacht services</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Wholesale pricing and bulk orders</span>
                </li>
                <li className="flex items-start">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green mr-2 mt-1">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                  <span>Dedicated business account management</span>
                </li>
              </ul>
              <Link 
                to="/business" 
                className="inline-block bg-gray-800 text-white px-6 py-3 hover:bg-gray-700 transition-colors"
              >
                Business Solutions
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* HoReCa Products Section */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">HoReCa Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional-grade tableware designed for hotels, restaurants, beach clubs and yachts
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
            {horecaProducts.map(product => (
              <div key={product.id}>
                <ProductCard {...product} />
              </div>
            ))}
          </div>
          
          <div className="text-center">
            <Link 
              to="/business" 
              className="inline-block bg-brand-green text-white px-8 py-3 hover:bg-brand-lightGreen transition-colors"
            >
              View All Business Solutions
            </Link>
          </div>
        </div>
      </section>
      
      {/* Table Setting Visualizer */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">Table Setting Service</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Let us help you create the perfect table setting for any occasion
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-10">
            <div>
              <TableSettingVisualizer />
            </div>
            <div className="flex flex-col justify-center">
              <h3 className="text-2xl font-serif mb-4">Personalized Table Setting Consultation</h3>
              <p className="text-gray-700 leading-relaxed mb-6">
                Our expert designers can help you create the perfect table setting for any occasion, whether you're hosting an intimate dinner or a grand celebration.
              </p>
              
              <ul className="space-y-4 mb-8">
                <li className="flex items-start">
                  <div className="mr-3 bg-brand-green/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                      <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
                      <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                      <path d="M12 2v2"/>
                      <path d="M12 22v-2"/>
                      <path d="m17 20.66-1-1.73"/>
                      <path d="M11 10.27 7 3.34"/>
                      <path d="m20.66 17-1.73-1"/>
                      <path d="m3.34 7 1.73 1"/>
                      <path d="M14 12h8"/>
                      <path d="M2 12h2"/>
                      <path d="m20.66 7-1.73 1"/>
                      <path d="m3.34 17 1.73-1"/>
                      <path d="m17 3.34-1 1.73"/>
                      <path d="m7 20.66-1-1.73"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Expert Consultation</h4>
                    <p className="text-gray-600">Personalized advice from our tableware specialists</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 bg-brand-green/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                      <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/>
                      <path d="M5 3v4"/>
                      <path d="M19 17v4"/>
                      <path d="M3 5h4"/>
                      <path d="M17 19h4"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Custom Set Creation</h4>
                    <p className="text-gray-600">Curated combinations tailored to your style and needs</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 bg-brand-green/10 p-2 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-brand-green">
                      <rect width="18" height="18" x="3" y="3" rx="2"/>
                      <path d="M3 9h18"/>
                      <path d="M3 15h18"/>
                      <path d="M9 3v18"/>
                      <path d="M15 3v18"/>
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-medium text-lg mb-1">Visual Presentations</h4>
                    <p className="text-gray-600">See how your selections will look together before purchasing</p>
                  </div>
                </li>
              </ul>
              
              <Link 
                to="/contact" 
                className="inline-block bg-brand-green text-white px-6 py-3 hover:bg-brand-lightGreen transition-colors"
              >
                Request Consultation
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Newsletter and Contact sections have been removed */}
    </Layout>
  );
};

export default Index;
