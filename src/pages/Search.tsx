import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Layout from '../components/Layout';
import ProductCard from '../components/ProductCard';
import { Search as SearchIcon } from 'lucide-react';

// Mock search results for the demo
const mockProducts = [
  {
    id: 1,
    name: "Milano Melamine Plate",
    price: 390,
    image: "https://ampriomilano.com/cdn/shop/files/PLA3.MAM05_d45cf525-3092-41b6-9a16-624e47fed4b9_400x.png?v=1746355234",
    itemNo: "PLA3.MAM05",
    diameter: "22 cm"
  },
  {
    id: 2,
    name: "Ortigia Melamine Bowl",
    price: 280,
    image: "https://ampriomilano.com/cdn/shop/files/TS_MAM04_45100a99-1976-42f5-8721-ff4357d9d967_400x.png?v=1746406478",
    itemNo: "TS.MAM04",
    diameter: "18 cm"
  },
  {
    id: 3,
    name: "Milano Small Bowl",
    price: 240,
    image: "https://ampriomilano.com/cdn/shop/files/BOL1.MAM03_34bf36bb-3199-4c0b-bdc2-8ca64dbf3a12_400x.png?v=1746406880",
    itemNo: "BOL1.MAM03",
    diameter: "15 cm"
  },
  {
    id: 4,
    name: "Milano Wine Glass",
    price: 210,
    image: "https://ampriomilano.com/cdn/shop/files/PLAR.MICA04_3efcc2df-8b59-40e7-aa67-0bc005720fb8_400x.png?v=1746463780",
    itemNo: "PLAR.MICA04",
  },
];

const Search = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [query, setQuery] = useState(searchParams.get('q') || '');
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [isInitialLoad, setIsInitialLoad] = useState(true);
  
  useEffect(() => {
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQuery(searchQuery);
      performSearch(searchQuery);
    } else {
      setResults([]);
      setIsInitialLoad(false);
    }
  }, [searchParams]);
  
  const performSearch = (searchTerm: string) => {
    setLoading(true);
    
    // Simulate API search delay
    setTimeout(() => {
      if (searchTerm.trim() === '') {
        setResults([]);
      } else {
        // Filter mock products based on search term
        const filteredResults = mockProducts.filter(product => 
          product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (product.itemNo && product.itemNo.toLowerCase().includes(searchTerm.toLowerCase()))
        );
        setResults(filteredResults);
      }
      setLoading(false);
      setIsInitialLoad(false);
    }, 800);
  };
  
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchParams({ q: query });
    performSearch(query);
  };
  
  return (
    <Layout>
      <div className="container-custom py-12">
        <h1 className="text-4xl md:text-5xl font-serif mb-8 text-center">Search</h1>
        
        <div className="max-w-2xl mx-auto mb-10">
          <form onSubmit={handleSubmit}>
            <div className="flex border border-gray-300">
              <input 
                type="text" 
                value={query} 
                onChange={(e) => setQuery(e.target.value)} 
                placeholder="Search for products, collections, or item numbers..." 
                className="flex-grow px-4 py-3 focus:outline-none"
                aria-label="Search"
              />
              <button 
                type="submit" 
                className="bg-brand-green text-white px-6 flex items-center justify-center hover:bg-brand-lightGreen transition-colors"
              >
                <SearchIcon size={20} />
              </button>
            </div>
          </form>
        </div>
        
        {loading ? (
          <div className="text-center py-20">
            <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-green border-r-transparent" role="status">
              <span className="sr-only">Loading...</span>
            </div>
            <p className="mt-4 text-gray-600">Searching...</p>
          </div>
        ) : !isInitialLoad ? (
          <div>
            {query && (
              <h2 className="text-xl mb-6">
                {results.length > 0 
                  ? `Found ${results.length} results for "${query}"`
                  : `No results found for "${query}"`
                }
              </h2>
            )}
            
            {results.length > 0 ? (
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 md:gap-10">
                {results.map(product => (
                  <ProductCard key={product.id} {...product} />
                ))}
              </div>
            ) : query && (
              <div className="text-center py-10">
                <p className="text-gray-600 mb-4">We couldn't find any products matching your search.</p>
                <p className="text-gray-600">Try using different keywords or check for spelling errors.</p>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-20">
            <SearchIcon size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-600">Enter keywords to search our store</p>
          </div>
        )}
        
        {/* Popular searches section (only show when there are no results or no search yet) */}
        {!loading && (results.length === 0) && (
          <div className="mt-16">
            <h3 className="text-xl font-serif mb-6 text-center">Popular Searches</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['melamine', 'plates', 'bowls', 'glasses', 'outdoor', 'gifts', 'new arrivals'].map(term => (
                <button 
                  key={term}
                  onClick={() => {
                    setQuery(term);
                    setSearchParams({ q: term });
                    performSearch(term);
                  }}
                  className="px-4 py-2 bg-gray-100 hover:bg-gray-200 transition-colors rounded-full text-sm"
                >
                  {term}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Search;
