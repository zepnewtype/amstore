"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Heart, Share2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface ProductImageGalleryProps {
  images: string[]
  productName: string
  id: number | string
  mainImage?: string
  setMainImage?: (url: string) => void
}

const ProductImageGallery = ({ images, productName, id, mainImage, setMainImage }: ProductImageGalleryProps) => {
  const [currentImage, setCurrentImage] = useState(mainImage || images[0])
  const [isWishlist, setIsWishlist] = useState(false)
  const { toast } = useToast()
  const galleryRef = useRef<HTMLDivElement>(null)
  const [touchStart, setTouchStart] = useState<number | null>(null)
  const [touchEnd, setTouchEnd] = useState<number | null>(null)

  // Минимальное расстояние свайпа для смены изображения
  const minSwipeDistance = 50

  useEffect(() => {
    if (mainImage) {
      setCurrentImage(mainImage)
    }
  }, [mainImage])

  const handleImageClick = (image: string) => {
    setCurrentImage(image)
    if (setMainImage) {
      setMainImage(image)
    }
  }

  const handleWishlist = () => {
    setIsWishlist(!isWishlist)
    toast({
      title: isWishlist ? "Removed from wishlist" : "Added to wishlist",
      description: `${productName} has been ${isWishlist ? "removed from" : "added to"} your wishlist`,
      duration: 3000,
    })
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: productName,
          url: window.location.href,
        })
        .catch((error) => console.log("Error sharing", error))
    } else {
      navigator.clipboard.writeText(window.location.href)
      toast({
        title: "Link copied",
        description: "Product link has been copied to clipboard",
        duration: 3000,
      })
    }
  }

  // Обработчики свайпа
  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
  }

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return

    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    // Находим индекс текущего изображения
    const currentIndex = images.indexOf(currentImage)

    if (isLeftSwipe && currentIndex < images.length - 1) {
      // Свайп влево - следующее изображение
      const nextImage = images[currentIndex + 1]
      setCurrentImage(nextImage)
      if (setMainImage) setMainImage(nextImage)
    }

    if (isRightSwipe && currentIndex > 0) {
      // Свайп вправо - предыдущее изображение
      const prevImage = images[currentIndex - 1]
      setCurrentImage(prevImage)
      if (setMainImage) setMainImage(prevImage)
    }
  }

  return (
    <div className="lg:w-3/5">
      {/* Main image */}
      <div
        className="relative aspect-square bg-gray-50 mb-4 overflow-hidden"
        ref={galleryRef}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <img src={currentImage || "/placeholder.svg"} alt={productName} className="w-full h-full object-contain" />

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex flex-col gap-2">
          <button
            onClick={handleWishlist}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
          >
            <Heart size={20} className={isWishlist ? "fill-[#E53935] text-[#E53935]" : ""} />
          </button>
          <button
            onClick={handleShare}
            className="bg-white w-10 h-10 rounded-full flex items-center justify-center shadow-sm hover:bg-gray-50 transition-colors"
            aria-label="Share product"
          >
            <Share2 size={20} />
          </button>
        </div>

        {/* Индикаторы свайпа для мобильных устройств */}
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1 md:hidden">
          {images.map((img, index) => (
            <div
              key={index}
              className={`w-2 h-2 rounded-full ${currentImage === img ? "bg-brand-green" : "bg-gray-300"}`}
            />
          ))}
        </div>
      </div>

      {/* Thumbnails - скроллируемые на мобильных */}
      {images.length > 1 && (
        <div className="flex overflow-x-auto gap-2 pb-2 snap-x snap-mandatory scrollbar-hide">
          {images.map((image, index) => (
            <div
              key={index}
              className={`flex-shrink-0 w-20 h-20 cursor-pointer snap-start ${
                currentImage === image ? "border-2 border-brand-green" : "border border-gray-200"
              }`}
              onClick={() => handleImageClick(image)}
            >
              <img
                src={image || "/placeholder.svg"}
                alt={`${productName} - view ${index + 1}`}
                className="w-full h-full object-contain"
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductImageGallery
