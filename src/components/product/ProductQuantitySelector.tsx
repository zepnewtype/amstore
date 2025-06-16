"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Minus, Plus } from "lucide-react"

interface ProductQuantitySelectorProps {
  initialQuantity?: number
  onQuantityChange: (quantity: number) => void
  max?: number
}

const ProductQuantitySelector = ({ initialQuantity = 1, onQuantityChange, max = 99 }: ProductQuantitySelectorProps) => {
  const [quantity, setQuantity] = useState(initialQuantity)
  const [isDecreasing, setIsDecreasing] = useState(false)
  const [isIncreasing, setIsIncreasing] = useState(false)

  useEffect(() => {
    onQuantityChange(quantity)
  }, [quantity, onQuantityChange])

  const handleDecrease = () => {
    if (quantity > 1) {
      setIsDecreasing(true)
      setTimeout(() => setIsDecreasing(false), 150)
      setQuantity((prev) => prev - 1)
    }
  }

  const handleIncrease = () => {
    if (quantity < max) {
      setIsIncreasing(true)
      setTimeout(() => setIsIncreasing(false), 150)
      setQuantity((prev) => prev + 1)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number.parseInt(e.target.value)
    if (!isNaN(value) && value >= 1 && value <= max) {
      setQuantity(value)
    }
  }

  return (
    <div className="mt-6">
      <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
        Quantity
      </label>
      <div className="flex items-center border border-gray-300 rounded-md w-full max-w-[180px] overflow-hidden">
        <button
          type="button"
          onClick={handleDecrease}
          className={`p-3 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors ${isDecreasing ? "scale-95" : ""}`}
          aria-label="Decrease quantity"
          disabled={quantity <= 1}
        >
          <Minus size={16} />
        </button>
        <input
          type="text"
          id="quantity"
          value={quantity}
          onChange={handleChange}
          className="w-12 text-center border-none focus:ring-0 focus:outline-none"
          aria-label="Quantity"
        />
        <button
          type="button"
          onClick={handleIncrease}
          className={`p-3 text-gray-500 hover:bg-gray-100 active:bg-gray-200 transition-colors ${isIncreasing ? "scale-95" : ""}`}
          aria-label="Increase quantity"
          disabled={quantity >= max}
        >
          <Plus size={16} />
        </button>
      </div>
    </div>
  )
}

export default ProductQuantitySelector
