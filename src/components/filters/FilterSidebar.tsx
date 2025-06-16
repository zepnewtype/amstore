"use client"

import { useState } from "react"
import { useSearchParams, useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { X } from "lucide-react"

const priceRanges = [
  { label: "Under 100 AED", value: [0, 100] },
  { label: "100 AED - 200 AED", value: [100, 200] },
  { label: "200 AED - 500 AED", value: [200, 500] },
  { label: "500 AED and above", value: [500, 1000] },
]

const categories = [
  "Dinnerware",
  "Drinkware",
  "Flatware",
  "Serveware",
  "Table Linens",
  "Home Decor",
]

export function FilterSidebar() {
  const searchParams = useSearchParams()
  const navigate = useNavigate()
  const [priceRange, setPriceRange] = useState<[number, number]>([
    Number(searchParams.get("minPrice")) || 0,
    Number(searchParams.get("maxPrice")) || 1000,
  ])
  const [selectedCategories, setSelectedCategories] = useState<string[]>(
    searchParams.get("categories")?.split(",") || []
  )

  const updateFilters = (newParams: Record<string, string>) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    
    // Update or remove params
    Object.entries(newParams).forEach(([key, value]) => {
      if (value) {
        current.set(key, value)
      } else {
        current.delete(key)
      }
    })

    // Reset to page 1 when filters change
    current.set("page", "1")

    // Update URL
    navigate(`?${current.toString()}`)
  }

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value as [number, number])
    updateFilters({
      minPrice: value[0].toString(),
      maxPrice: value[1].toString(),
    })
  }

  const handleCategoryToggle = (category: string) => {
    const newCategories = selectedCategories.includes(category)
      ? selectedCategories.filter((c) => c !== category)
      : [...selectedCategories, category]

    setSelectedCategories(newCategories)
    updateFilters({
      categories: newCategories.join(","),
    })
  }

  const clearFilters = () => {
    setPriceRange([0, 1000])
    setSelectedCategories([])
    navigate("")
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold">Filters</h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="text-gray-500 hover:text-gray-700"
        >
          <X className="h-4 w-4 mr-1" />
          Clear all
        </Button>
      </div>

      {/* Price Range */}
      <div className="space-y-4">
        <h4 className="font-medium">Price Range</h4>
        <Slider
          value={priceRange}
          onValueChange={handlePriceChange}
          min={0}
          max={1000}
          step={10}
          className="w-full"
        />
        <div className="flex justify-between text-sm text-gray-500">
          <span>{priceRange[0]} AED</span>
          <span>{priceRange[1]} AED</span>
        </div>
      </div>

      {/* Quick Price Ranges */}
      <div className="space-y-2">
        {priceRanges.map((range) => (
          <Button
            key={range.label}
            variant="ghost"
            className="w-full justify-start text-sm"
            onClick={() => handlePriceChange(range.value)}
          >
            {range.label}
          </Button>
        ))}
      </div>

      {/* Categories */}
      <div className="space-y-4">
        <h4 className="font-medium">Categories</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={category}
                checked={selectedCategories.includes(category)}
                onCheckedChange={() => handleCategoryToggle(category)}
              />
              <Label htmlFor={category} className="text-sm">
                {category}
              </Label>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
