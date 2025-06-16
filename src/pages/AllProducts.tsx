import { useState, useEffect, useMemo } from 'react';
import Layout from '../components/Layout';
import ProductGrid from '../components/ProductGrid';
import FilterSidebar from '../components/filters/FilterSidebar';
import SortDropdown from '../components/filters/SortDropdown';
import { getAllProducts } from '../api/shopifyProducts';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { Filter, X } from 'lucide-react';

const fallbackImg = '/fallback-product.png';

const sortOptions = [
  { value: 'featured', label: 'Featured' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
  { value: 'newest', label: 'Newest' },
  { value: 'alphabetical', label: 'Alphabetical' }
];

function mapShopifyToProductCard(product: any) {
  const mainVariant = product.variants[0] || {};
  return {
    id: product.id,
    name: product.title,
    price: mainVariant.price ? parseFloat(mainVariant.price) : 0,
    image: product.images[0]?.url || fallbackImg,
    hoverImage: product.images[1]?.url || undefined,
    isNew: false, // Можно добавить свою логику
    isSale: mainVariant.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price,
    salePrice: mainVariant.compareAtPrice && mainVariant.compareAtPrice > mainVariant.price ? parseFloat(mainVariant.price) : undefined,
    itemNo: mainVariant.sku,
    diameter: product.options.find((o: any) => o.name.toLowerCase().includes('size'))?.values[0],
    inStock: mainVariant.quantityAvailable,
    currency: mainVariant.currency || 'AED',
    description: product.description,
    handle: product.handle,
  };
}

const PAGE_SIZE = 30;

const AllProducts = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<any[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [sortOption, setSortOption] = useState('featured');
  const [filters, setFilters] = useState<any>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const data = await getAllProducts();
        setProducts(data);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Динамические фильтры на основе реальных данных
  const filterOptions = useMemo(() => {
    const productTypes = Array.from(new Set(products.map((p) => p.type).filter(Boolean)));
    const vendors = Array.from(new Set(products.map((p) => p.vendor).filter(Boolean)));
    const tags = Array.from(new Set(products.flatMap((p) => p.tags || [])));
    const colors = Array.from(new Set(products.flatMap((p) =>
      (p.options.find((o: any) => o.name.toLowerCase() === 'color')?.values) || []
    )));
    return {
      productTypes,
      vendors,
      tags,
      colors,
    };
  }, [products]);

  // Фильтрация товаров
  const filteredProducts = useMemo(() => {
    let result = products;
    if (filters.productType) {
      result = result.filter((p) => p.type === filters.productType);
    }
    if (filters.vendor) {
      result = result.filter((p) => p.vendor === filters.vendor);
    }
    if (filters.color) {
      result = result.filter((p) =>
        p.options.find((o: any) => o.name.toLowerCase() === 'color')?.values.includes(filters.color)
      );
    }
    // Можно добавить фильтрацию по tags, цене и т.д.
    return result;
  }, [products, filters]);

  // Сортировка
  const sortedProducts = useMemo(() => {
    let arr = [...filteredProducts];
    switch (sortOption) {
      case 'price-asc':
        arr.sort((a, b) => (a.variants[0]?.price || 0) - (b.variants[0]?.price || 0));
        break;
      case 'price-desc':
        arr.sort((a, b) => (b.variants[0]?.price || 0) - (a.variants[0]?.price || 0));
        break;
      case 'alphabetical':
        arr.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'newest':
        arr.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
        break;
      default:
        break;
    }
    return arr;
  }, [filteredProducts, sortOption]);

  // Маппинг для ProductGrid
  const productGridData = sortedProducts.map(mapShopifyToProductCard);

  // Пагинация
  const totalPages = Math.ceil(productGridData.length / PAGE_SIZE);
  const paginatedProducts = showAll
    ? productGridData
    : productGridData.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleShowAll = () => {
    setShowAll(true);
  };

  const handleShowPaged = () => {
    setShowAll(false);
    setCurrentPage(1);
  };

  return (
    <Layout>
      {/* Breadcrumb */}
      <div className="bg-[#f8f8f8] py-3 border-b border-gray-200">
        <div className="container-custom">
          <div className="flex items-center text-sm">
            <Link to="/" className="text-gray-500 hover:text-brand-green transition-colors">Home</Link>
            <span className="mx-2 text-gray-400">/</span>
            <span className="text-gray-800">All Products</span>
          </div>
        </div>
      </div>
      <div className="container-custom py-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-serif mb-4">All Products</h1>
          <p className="text-gray-600 max-w-3xl">
            Browse our complete collection of premium tableware and home decor items,
            crafted with exquisite attention to detail and design.
          </p>
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar filters - desktop */}
          <div className="hidden lg:block w-64 flex-shrink-0">
            <FilterSidebar 
              filterOptions={filterOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          {/* Mobile filter button */}
          <div className="flex justify-between items-center sticky top-0 bg-white z-10 py-4 lg:hidden border-b border-gray-200 mb-4">
            <button 
              onClick={() => setIsMobileFiltersOpen(true)} 
              className="flex items-center text-sm"
            >
              <Filter size={18} className="mr-2" />
              Filters
            </button>
            <SortDropdown 
              options={sortOptions}
              value={sortOption}
              onChange={handleSortChange}
            />
          </div>
          {/* Products grid */}
          <div className="flex-1">
            {/* Desktop sorting */}
            <div className="hidden lg:flex justify-between items-center mb-8">
              <p className="text-sm text-gray-500">
                {isLoading ? 'Loading products...' : `${filteredProducts.length} products`}
              </p>
              <SortDropdown 
                options={sortOptions}
                value={sortOption}
                onChange={handleSortChange}
              />
            </div>
            {/* Products */}
            {isLoading ? (
              // Loading state
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                  <div key={item} className="animate-pulse">
                    <div className="aspect-square bg-gray-100 mb-4"></div>
                    <div className="h-4 bg-gray-100 w-3/4 mb-2"></div>
                    <div className="h-4 bg-gray-100 w-1/2"></div>
                  </div>
                ))}
              </div>
            ) : (
              <ProductGrid products={paginatedProducts} columns={4} isLoading={isLoading} />
            )}
            {/* Пагинация */}
            {!isLoading && productGridData.length > PAGE_SIZE && !showAll && (
              <div className="flex flex-wrap justify-center items-center gap-2 mt-8">
                <button
                  className="px-3 py-1 rounded border text-sm disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage - 1)}
                  disabled={currentPage === 1}
                >Назад</button>
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    className={`px-3 py-1 rounded border text-sm ${currentPage === i + 1 ? 'bg-brand-green text-white' : ''}`}
                    onClick={() => handlePageChange(i + 1)}
                  >{i + 1}</button>
                ))}
                <button
                  className="px-3 py-1 rounded border text-sm disabled:opacity-50"
                  onClick={() => handlePageChange(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >Вперёд</button>
                <button
                  className="ml-4 px-4 py-1 rounded bg-gray-100 text-sm border"
                  onClick={handleShowAll}
                >Показать все</button>
              </div>
            )}
            {/* Кнопка "Показать постранично" если выбрано "Показать все" */}
            {!isLoading && showAll && productGridData.length > PAGE_SIZE && (
              <div className="flex justify-center mt-8">
                <button
                  className="px-4 py-2 rounded bg-gray-100 border text-sm"
                  onClick={handleShowPaged}
                >Показать постранично</button>
              </div>
            )}
            {/* Empty state */}
            {!isLoading && filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No products found</h3>
                <p className="text-gray-500 mb-6">Try adjusting your filters or browse our collections.</p>
                <Link to="/collections" className="fashion-btn">
                  Browse Collections
                </Link>
              </div>
            )}
          </div>
        </div>
        {/* Mobile filter sidebar */}
        <div className={`fixed inset-0 z-50 bg-white transform transition-transform duration-300 ${
          isMobileFiltersOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div className="flex justify-between items-center border-b border-gray-200 p-4">
            <h3 className="font-medium">Filters</h3>
            <button onClick={() => setIsMobileFiltersOpen(false)}>
              <X size={24} />
            </button>
          </div>
          <div className="p-4 h-full overflow-auto pb-32">
            <FilterSidebar 
              filterOptions={filterOptions}
              filters={filters}
              setFilters={setFilters}
            />
          </div>
          <div className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-gray-200">
            <button 
              onClick={() => setIsMobileFiltersOpen(false)}
              className="w-full py-3 bg-brand-green text-white"
            >
              View Results
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AllProducts;
