"use client"

import { useSearchParams, useNavigate } from "react-router-dom"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const sortOptions = [
  { label: "Featured", value: "featured" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
  { label: "Best Selling", value: "best-selling" },
  { label: "Newest", value: "newest" },
]

export function SortDropdown() {
  const searchParams = useSearchParams()
  const navigate = useNavigate()
  const currentSort = searchParams.get("sort") || "featured"

  const handleSortChange = (value: string) => {
    const current = new URLSearchParams(Array.from(searchParams.entries()))
    current.set("sort", value)
    current.set("page", "1") // Reset to page 1 when sort changes
    navigate(`?${current.toString()}`)
  }

  return (
    <Select value={currentSort} onValueChange={handleSortChange}>
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Sort by" />
      </SelectTrigger>
      <SelectContent>
        {sortOptions.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}
