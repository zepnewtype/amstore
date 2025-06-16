"use client"

import { useEffect, useState } from "react"
import { useParams, useSearchParams } from "react-router-dom"
import { ProductGrid } from "@/components/ProductGrid"
import { FilterSidebar } from "@/components/filters/FilterSidebar"
import { SortDropdown } from "@/components/filters/SortDropdown"
import { shopifyProducts } from "@/api/shopifyProducts"
import { ShopifyProduct, ShopifyCollection } from "@/api/types"
import { ITEMS_PER_PAGE } from "@/lib/constants"

export default function Collection() {
  const { handle } = useParams<{ handle: string }>()
  const [collection, setCollection] = useState<ShopifyCollection | null>(null)
  const [products, setProducts] = useState<ShopifyProduct[]>([])
  const [loading, setLoading] = useState(true)
  const [totalProducts, setTotalProducts] = useState(0)
  const searchParams = useSearchParams()
  const page = Number(searchParams.get("page")) || 1
  const sort = searchParams.get("sort") || "featured"
  const minPrice = Number(searchParams.get("minPrice")) || 0
  const maxPrice = Number(searchParams.get("maxPrice")) || 1000

  useEffect(() => {
    const fetchCollection = async () => {
      if (!handle) return
      try {
        const fetchedCollection = await shopifyProducts.getCollectionByHandle(handle)
        setCollection(fetchedCollection)
      } catch (error) {
        console.error("Error fetching collection:", error)
      }
    }

    fetchCollection()
  }, [handle])

  useEffect(() => {
    const fetchProducts = async () => {
      if (!handle) return
      setLoading(true)
      try {
        const fetchedProducts = await shopifyProducts.getProducts({
          first: ITEMS_PER_PAGE,
          after: page > 1 ? ((page - 1) * ITEMS_PER_PAGE).toString() : undefined,
          sortKey: sort,
          collectionHandle: handle,
          minPrice: minPrice || undefined,
          maxPrice: maxPrice || undefined,
        })
        setProducts(fetchedProducts.products)
        setTotalProducts(fetchedProducts.totalCount)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [handle, page, sort, minPrice, maxPrice])

  if (!collection) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Collection not found</h1>
          <p className="text-gray-600">The collection you're looking for doesn't exist or has been removed.</p>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Collection Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">{collection.title}</h1>
        {collection.description && (
          <div 
            className="prose max-w-none text-gray-600"
            dangerouslySetInnerHTML={{ __html: collection.description }}
          />
        )}
      </div>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters Sidebar */}
        <div className="w-full md:w-64 flex-shrink-0">
          <FilterSidebar />
        </div>

        {/* Products Grid */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-6">
            <p className="text-gray-600">
              {totalProducts} {totalProducts === 1 ? 'product' : 'products'}
            </p>
            <SortDropdown />
          </div>

          <ProductGrid 
            products={products}
            loading={loading}
            totalProducts={totalProducts}
            currentPage={page}
            itemsPerPage={ITEMS_PER_PAGE}
          />
        </div>
      </div>
    </div>
  )
}
