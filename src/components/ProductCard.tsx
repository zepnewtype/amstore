"use client"

import type React from "react"

import { useState } from "react"
import { Link } from "react-router-dom"
import { useCart } from "./Cart"
import { ShoppingBag, ImageOff } from "lucide-react"

interface ProductCardProps {
  id: number
  name: string
  price: number
  image: string
  hoverImage?: string
  isNew?: boolean
  isSale?: boolean
  salePrice?: number
  itemNo?: string
  diameter?: string
  inStock?: number
  deliveryTime?: string
  currency?: string
  category?: string
  description?: string
  handle: string
}

const ProductCard = ({
  id,
  name,
  price,
  image,
  hoverImage,
  isNew = false,
  isSale = false,
  salePrice,
  itemNo,
  diameter,
  inStock,
  deliveryTime,
  currency = "AED",
  category,
  description,
  handle,
}: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false)
  const { addToCart } = useCart()
  const [quantity, setQuantity] = useState(1)
  const [isAddingToCart, setIsAddingToCart] = useState(false)

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()

    setIsAddingToCart(true)
    addToCart({
      id,
      name,
      price: isSale && salePrice ? salePrice : price,
      image: image || "",
      quantity: quantity,
    })

    // Анимация добавления в корзину
    setTimeout(() => {
      setIsAddingToCart(false)
    }, 800)
  }

  const increaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setQuantity((prev) => prev + 1)
  }

  const decreaseQuantity = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (quantity > 1) {
      setQuantity((prev) => prev - 1)
    }
  }

  // HoReCa category icon
  const renderCategoryIcon = () => {
    if (!category) return null

    let icon = null

    switch (category) {
      case "restaurant":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V7" />
            <path d="M6 7v-2a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v2" />
            <path d="M3 7h18" />
            <path d="M9 14v2" />
            <path d="M15 14v2" />
          </svg>
        )
        break
      case "hotel":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M19 21V5a2 2 0 0 0-2-2H7a2 2 0 0 0-2 2v16" />
            <path d="M5 12h14" />
            <path d="M9 12v5" />
            <path d="M15 12v5" />
            <path d="M3 21h18" />
          </svg>
        )
        break
      case "beach":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 22a20.3 20.3 0 0 1 20 0" />
            <path d="M12 6a4 4 0 0 0-4 7h8a4 4 0 0 0-4-7z" />
            <path d="M12 3v3" />
            <path d="m6.82 7.3 2.12 2.13" />
            <path d="m15.06 9.43 2.12-2.13" />
          </svg>
        )
        break
      case "yacht":
        icon = (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M2 21c.6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1 .6.5 1.2 1 2.5 1 2.5 0 2.5-2 5-2 1.3 0 1.9.5 2.5 1" />
            <path d="m20 20-5-18h-4c0 3-2 5-5 5v3a7 7 0 0 0 7 7h9.5" />
            <path d="M12 11h0" />
          </svg>
        )
        break
      default:
        return null
    }

    return (
      <div className="absolute top-2 right-2 bg-white/80 p-1 rounded-full" title={`Recommended for ${category}`}>
        {icon}
      </div>
    )
  }

  return (
    <div className="group" onMouseEnter={() => setIsHovered(true)} onMouseLeave={() => setIsHovered(false)}>
      {/* Product image - squared aspect ratio */}
      <Link to={`/products/${handle}`} className="block relative">
        <div className="aspect-square w-full bg-gray-50 overflow-hidden">
          {image ? (
            <img
              src={isHovered && hoverImage ? hoverImage : image}
              alt={name}
              className="w-full h-full object-contain transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <ImageOff className="text-gray-400" size={32} />
            </div>
          )}
        </div>

        {/* Product badges */}
        <div className="absolute bottom-2 left-2 flex flex-col gap-2">
          {isNew && <span className="bg-brand-green text-white text-xs py-1 px-2 uppercase tracking-wide">New</span>}
          {isSale && <span className="bg-[#E53935] text-white text-xs py-1 px-2 uppercase tracking-wide">Sale</span>}
        </div>

        {/* Quick add to cart with quantity selector - улучшенная версия для мобильных */}
        <div className="absolute bottom-2 right-2 flex flex-col gap-2 opacity-0 transform translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 touch:opacity-100 touch:translate-y-0">
          <div className="bg-white shadow-md rounded-md flex items-center overflow-hidden">
            <button
              onClick={decreaseQuantity}
              className="p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Decrease quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14"></path>
              </svg>
            </button>
            <span className="px-3 min-w-[24px] text-center">{quantity}</span>
            <button
              onClick={increaseQuantity}
              className="p-2 hover:bg-gray-100 active:bg-gray-200 transition-colors"
              aria-label="Increase quantity"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M12 5v14"></path>
                <path d="M5 12h14"></path>
              </svg>
            </button>
          </div>
          <button
            onClick={handleAddToCart}
            className={`bg-brand-green text-white p-3 rounded-full transition-all ${isAddingToCart ? "scale-95 bg-brand-darkGreen" : "hover:bg-brand-lightGreen active:scale-95"}`}
            aria-label="Add to cart"
          >
            <ShoppingBag size={18} />
          </button>
        </div>

        {/* Category icon for HoReCa products */}
        {renderCategoryIcon()}
      </Link>

      {/* Product info */}
      <div className="mt-3 md:mt-4 text-center">
        <Link to={`/products/${handle}`} className="block">
          <h3 className="text-sm font-medium hover:text-brand-green transition-colors line-clamp-2">{name}</h3>
        </Link>
        {description && (
          <p className="text-xs text-gray-600 mt-1 line-clamp-2 overflow-hidden text-ellipsis">{description}</p>
        )}
        {itemNo && <p className="text-xs text-gray-500 mt-1">Item no. {itemNo}</p>}
        {diameter && <p className="text-xs text-gray-500 mt-1">Ø {diameter}</p>}
        <div className="mt-1">
          {isSale && salePrice ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-[#E53935] font-medium">
                {salePrice} {currency}
              </span>
              <span className="text-gray-400 line-through">
                {price} {currency}
              </span>
            </div>
          ) : (
            <span className="text-gray-800">
              {price} {currency}
            </span>
          )}
        </div>
        {inStock && <p className="text-xs text-brand-green mt-2">In stock ({inStock})</p>}
        {deliveryTime && <p className="text-xs text-gray-500">Delivery: {deliveryTime}</p>}
      </div>
    </div>
  )
}

export default ProductCard
