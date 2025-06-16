"use client"

import { useState } from "react"
import { ShoppingBag, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ProductActionsProps {
  onAddToCart: () => void
  price: number
  quantity: number
  productName: string
  isAddingToCart?: boolean
}

const ProductActions = ({ onAddToCart, price, quantity, productName, isAddingToCart = false }: ProductActionsProps) => {
  const [isWishlist, setIsWishlist] = useState(false)
  const [isAdded, setIsAdded] = useState(false)

  const handleAddToCart = () => {
    onAddToCart()
    setIsAdded(true)
    setTimeout(() => setIsAdded(false), 2000)
  }

  const handleWishlist = () => {
    setIsWishlist(!isWishlist)
  }

  const totalPrice = price * quantity

  return (
    <div className="mt-6 space-y-4">
      {/* Total price */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500">Total:</span>
        <span className="text-xl font-medium">{totalPrice.toFixed(2)} AED</span>
      </div>

      {/* Action buttons */}
      <div className="flex gap-3">
        <Button
          onClick={handleAddToCart}
          className={`w-full py-6 bg-brand-green hover:bg-brand-lightGreen text-white transition-all duration-300 ${
            isAddingToCart || isAdded ? "scale-95 bg-brand-darkGreen" : ""
          }`}
          disabled={isAddingToCart || isAdded}
        >
          <ShoppingBag className="mr-2 h-5 w-5" />
          {isAdded ? "Added to Cart ✓" : "Add to Cart"}
        </Button>

        <Button
          onClick={handleWishlist}
          variant="outline"
          className="min-w-[56px] py-6 border-gray-300 hover:bg-gray-50 hover:text-brand-green transition-colors"
          aria-label={isWishlist ? "Remove from wishlist" : "Add to wishlist"}
        >
          <Heart className={`h-5 w-5 ${isWishlist ? "fill-[#E53935] text-[#E53935]" : ""}`} />
        </Button>
      </div>

      {/* Delivery info */}
      <p className="text-sm text-gray-500 text-center mt-4">Free delivery for orders over 500 AED</p>
    </div>
  )
}

export default ProductActions
