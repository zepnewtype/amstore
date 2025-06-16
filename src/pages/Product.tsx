import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { getProductByHandle, getAllProducts } from '../api/shopifyProducts';
import { Helmet } from 'react-helmet';
import ProductLineSection from '../components/ProductLineSection';
import RelatedProducts from '../components/RelatedProducts';
import { useToast } from "@/hooks/use-toast";
import { useCart } from '../components/Cart';
import Cart from '../components/Cart';
import ProductImageGallery from '../components/product/ProductImageGallery';
import ProductInfo from '../components/product/ProductInfo';
import ProductAttributes from '../components/product/ProductAttributes';
import ProductColorSelector from '../components/product/ProductColorSelector';
import ProductQuantitySelector from '../components/product/ProductQuantitySelector';
import ProductActions from '../components/product/ProductActions';
import ProductServices from '../components/product/ProductServices';
import ProductTabs from '../components/product/ProductTabs';
import ProductBreadcrumb from '../components/product/ProductBreadcrumb';
import BackButton from '../components/product/BackButton';

function getRandomItems(arr, count, excludeId) {
  const filtered = arr.filter((item) => item.id !== excludeId);
  const shuffled = filtered.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

const Product = () => {
  const { handle } = useParams<{ handle: string }>();
  const [product, setProduct] = useState<any>(null);
  const [allProducts, setAllProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVariant, setSelectedVariant] = useState<any>(null);
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({});
  const [quantity, setQuantity] = useState(1);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [addedToCart, setAddedToCart] = useState(false);
  const [mainImage, setMainImage] = useState<string | undefined>(undefined);
  const { toast } = useToast();
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true);
      try {
        if (!handle) return;
        const data = await getProductByHandle(handle);
        if (!data) throw new Error("Product not found");

        setProduct(data);
        setAllProducts(await getAllProducts());

        // Set default selected variant to the first one
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0]);

          // Initialize selected options from the first variant
          const initialOptions: Record<string, string> = {};
          data.variants[0].selectedOptions.forEach((option: any) => {
            initialOptions[option.name] = option.value;
          });
          setSelectedOptions(initialOptions);
        }

        // Инициализируем mainImage
        if (data && data.images && data.images.length > 0) {
          setMainImage(data.images[0].url);
        }
      } catch (error) {
        console.error("Failed to fetch product:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, [handle]);

  const handleOptionChange = (optionName: string, optionValue: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    };

    setSelectedOptions(newSelectedOptions);

    // Find the variant that matches all selected options
    const matchingVariant = product.variants.find((variant: any) => {
      return variant.selectedOptions.every((option: any) => {
        return newSelectedOptions[option.name] === option.value;
      });
    });

    if (matchingVariant) {
      setSelectedVariant(matchingVariant);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity);
  };

  const handleAddToCart = () => {
    if (!selectedVariant) return;

    addToCart({
      id: selectedVariant.id,
      name: product.title,
      price: selectedVariant.price,
      image: selectedVariant.image?.url || product.images[0]?.url,
      quantity,
    });
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 1500);
    toast({
      title: "Added to bag",
      description: `${product.title} × ${quantity} added to your shopping bag`,
      duration: 3000,
    });
    setTimeout(() => setIsCartOpen(true), 800);
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-serif mb-4">Loading…</h1>
        </div>
      </Layout>
    );
  }

  if (!product) {
    return (
      <Layout>
        <div className="container-custom py-16 text-center">
          <h1 className="text-3xl font-serif mb-4">Product Not Found</h1>
          <p className="text-gray-600 mb-8">We couldn't find the product you're looking for.</p>
          <Link to="/products" className="fashion-btn">
            Browse All Products
          </Link>
        </div>
      </Layout>
    );
  }

  const images = product.images.map((img) => img.url);

  // All products of this line (same collection)
  let sameLine = [];
  if (product.collections && product.collections.length > 0) {
    const collectionHandles = product.collections.map((c) => c.handle);
    sameLine = allProducts.filter(
      (p) =>
        p.handle !== product.handle &&
        p.collections &&
        p.collections.some((c) => collectionHandles.includes(c.handle))
    ).map((p) => ({
      id: p.id,
      name: p.title,
      price: p.variants[0]?.price || 0,
      image: p.images[0]?.url || '',
      itemNo: p.variants[0]?.sku,
      diameter: p.options.find((o) => o.name.toLowerCase().includes('size'))?.values[0],
      inStock: p.variants[0]?.quantityAvailable,
      deliveryTime: '4-5 working days',
      currency: p.variants[0]?.currency || 'AED',
      description: p.description,
      handle: p.handle,
    }));
  }

  // Related products (random)
  const relatedProducts = getRandomItems(allProducts, 3, product.id).map((p) => ({
    id: p.id,
    name: p.title,
    price: p.variants[0]?.price || 0,
    image: p.images[0]?.url || '',
    isNew: false,
    isSale: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price,
    salePrice: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price ? p.variants[0]?.price : undefined,
    description: p.description,
    handle: p.handle,
  }));

  // Recently viewed (random, можно заменить на localStorage)
  const recentlyViewed = getRandomItems(allProducts, 3, product.id).map((p) => ({
    id: p.id,
    name: p.title,
    price: p.variants[0]?.price || 0,
    image: p.images[0]?.url || '',
    isNew: false,
    isSale: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price,
    salePrice: p.variants[0]?.compareAtPrice && p.variants[0]?.compareAtPrice > p.variants[0]?.price ? p.variants[0]?.price : undefined,
    description: p.description,
    handle: p.handle,
  }));

  return (
    <Layout>
      {/* Cart component */}
      <Cart isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      {/* Breadcrumb */}
      <ProductBreadcrumb product={product} />
      <div className="container-custom pt-4 pb-8">
        {/* Back button */}
        <BackButton />
        <div className="flex flex-col lg:flex-row gap-12 mt-2">
          {/* Product Images */}
          <ProductImageGallery 
            images={images} 
            productName={product.title}
            id={product.id}
            mainImage={mainImage}
            setMainImage={setMainImage}
          />
          {/* Product Details */}
          <div className="lg:w-2/5">
            <ProductInfo 
              product={product}
              variant={selectedVariant}
              deliveryTime={'4-5 working days'}
            />
            {/* Color selector */}
            <ProductColorSelector
              colorOptions={product.variants
                .map((v: any) => {
                  const color = v.selectedOptions?.find((opt: any) => opt.name.toLowerCase() === 'color')?.value;
                  return color ? { color, image: v.image?.url || product.images[0]?.url } : null;
                })
                .filter(Boolean)}
              selectedColor={selectedOptions['Color']}
              onColorChange={(color, image) => {
                handleOptionChange('Color', color);
                if (image) setMainImage(image);
              }}
            />
            {/* Quantity selector */}
            <ProductQuantitySelector
              initialQuantity={quantity}
              onQuantityChange={handleQuantityChange}
            />
            {/* Add to cart button */}
            <ProductActions
              onAddToCart={handleAddToCart}
              price={selectedVariant?.price}
              quantity={quantity}
              productName={product.title}
              isAddingToCart={addedToCart}
            />
            {/* Product attributes */}
            <ProductAttributes 
              materials={product.options.find((o) => o.name.toLowerCase() === 'material')?.values || []}
              diameter={product.options.find((o) => o.name.toLowerCase().includes('size'))?.values[0] || ''}
              sku={selectedVariant?.sku}
            />
            {/* Product tabs (аккордеон на мобильных) */}
            <ProductTabs
              description={product.description}
              details={product.options.map((o: any) => `${o.name}: ${o.values.join(', ')}`)}
            />
            {/* Product services */}
            <ProductServices />
          </div>
        </div>
        {/* All products in this line - Section */}
        {sameLine.length > 0 && (
          <ProductLineSection products={sameLine} title="All products of this line" />
        )}
        {/* Related Products */}
        <RelatedProducts 
          products={relatedProducts} 
          title="You May Also Like" 
          subtitle="Related Products" 
        />
        {/* Recently Viewed Products */}
        <RelatedProducts 
          products={recentlyViewed} 
          title="Recently Viewed" 
          subtitle="Your History" 
        />
      </div>
    </Layout>
  );
};

export default Product;
