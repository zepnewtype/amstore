import { useState } from 'react';
import { motion } from 'framer-motion';
import ProductImagePlaceholder from './ProductImagePlaceholder';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
  id?: string;
  mainImage?: string;
  setMainImage?: (img: string) => void;
}

const ProductImageGallery = ({ images, productName, id, mainImage, setMainImage }: ProductImageGalleryProps) => {
  const [internalMainImage, internalSetMainImage] = useState(images[0]);
  // Используем mainImage/setMainImage из пропсов, если переданы, иначе внутреннее состояние
  const currentMainImage = mainImage !== undefined ? mainImage : internalMainImage;
  const changeMainImage = setMainImage || internalSetMainImage;

  return (
    <motion.div 
      className="lg:w-3/5"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col gap-4">
        {/* Main Image */}
        <div className="w-full">
          <motion.div 
            className="aspect-square w-full"
            layoutId={`product-image-${id}`}
          >
            {currentMainImage ? (
              <img 
                src={currentMainImage} 
                alt={productName} 
                className="w-full h-full object-contain bg-gray-50"
              />
            ) : (
              <ProductImagePlaceholder className="w-full h-full" />
            )}
          </motion.div>
        </div>
        
        {/* Thumbnails below main image */}
        <div className="w-full flex gap-2 justify-center flex-wrap">
          {images.map((img, index) => (
            <motion.button 
              key={index}
              onClick={() => changeMainImage(img)}
              className={`aspect-square w-20 ${currentMainImage === img ? 'ring-2 ring-brand-green' : 'hover:opacity-80'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {img ? (
                <img 
                  src={img} 
                  alt={`${productName} - view ${index + 1}`} 
                  className="w-full h-full object-contain bg-gray-50"
                />
              ) : (
                <ProductImagePlaceholder className="w-full h-full" text="No image" />
              )}
            </motion.button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductImageGallery;
