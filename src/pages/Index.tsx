import Layout from '../components/Layout';
import Hero from '../components/Hero';
import ProductGrid from '../components/ProductGrid';
import ProductCard from '../components/ProductCard';
import CollectionCarousel from '../components/CollectionCarousel';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

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
      
      {/* Featured products section - MOVED UP */}
      <ProductGrid 
        products={featuredProducts} 
        title="Featured Products" 
        subtitle="Handpicked Selection"
      />
      
      {/* Collection Carousel - MOVED DOWN - FULL WIDTH */}
      <section className="py-12">
        <div className="container-full">
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
      
      {/* B2B Products Section - FULL WIDTH */}
      <section className="py-16">
        <div className="container-full">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-serif mb-3">B2B Solutions</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Professional-grade tableware designed for hotels, restaurants, beach clubs and yachts
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 mb-10">
            {horecaProducts.map(product => (
              <div key={product.id} className="w-full">
                <ProductCard {...product} handle={`product-${product.id}`} />
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
    </Layout>
  );
};

export default Index;
