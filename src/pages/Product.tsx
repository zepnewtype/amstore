"use client"

import { useState, useEffect } from "react"
import { useParams, Link } from "react-router-dom"
import Layout from "../components/Layout"
import { getProductByHandle } from "../api/shopifyProducts"
import ProductImageGallery from "../components/product/ProductImageGallery"
import ProductInfo from "../components/product/ProductInfo"
import ProductTabs from "../components/product/ProductTabs"
import ProductAttributes from "../components/product/ProductAttributes"
import ProductColorSelector from "../components/product/ProductColorSelector"
import ProductQuantitySelector from "../components/product/ProductQuantitySelector"
import ProductActions from "../components/product/ProductActions"
import ProductServices from "../components/product/ProductServices"
import RelatedProducts from "../components/RelatedProducts"
import { useCart } from "../components/Cart"
import { ProductSkeleton } from "../components/product/ProductSkeleton"
import ProductBreadcrumb from "../components/ProductBreadcrumb" // Import ProductBreadcrumb

function getRandomItems(arr, count, excludeId) {
  const filtered = arr.filter((item) => item.id !== excludeId)
  const shuffled = filtered.sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

const Product = () => {
  const { handle } = useParams<{ handle: string }>()
  const [product, setProduct] = useState<any>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [selectedVariant, setSelectedVariant] = useState<any>(null)
  const [selectedOptions, setSelectedOptions] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)
  const { addToCart, isInCart } = useCart()

  useEffect(() => {
    const fetchProduct = async () => {
      setIsLoading(true)
      try {
        if (!handle) return
        const data = await getProductByHandle(handle)
        if (!data) throw new Error("Product not found")

        setProduct(data)

        // Set default selected variant to the first one
        if (data.variants && data.variants.length > 0) {
          setSelectedVariant(data.variants[0])

          // Initialize selected options from the first variant
          const initialOptions: Record<string, string> = {}
          data.variants[0].selectedOptions.forEach((option: any) => {
            initialOptions[option.name] = option.value
          })
          setSelectedOptions(initialOptions)
        }
      } catch (error) {
        console.error("Failed to fetch product:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchProduct()
  }, [handle])

  const handleOptionChange = (optionName: string, optionValue: string) => {
    const newSelectedOptions = {
      ...selectedOptions,
      [optionName]: optionValue,
    }

    setSelectedOptions(newSelectedOptions)

    // Find the variant that matches all selected options
    const matchingVariant = product.variants.find((variant: any) => {
      return variant.selectedOptions.every((option: any) => {
        return newSelectedOptions[option.name] === option.value
      })
    })

    if (matchingVariant) {
      setSelectedVariant(matchingVariant)
    }
  }

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(newQuantity)
  }

  const handleAddToCart = () => {
    if (!selectedVariant) return

    addToCart({
      id: selectedVariant.id,
      productId: product.id,
      name: product.title,
      price: selectedVariant.price,
      image: selectedVariant.image?.url || product.images[0]?.url,
      options: selectedVariant.selectedOptions,
      quantity,
      handle: product.handle,
    })
  }

  const productInCart = selectedVariant ? isInCart(selectedVariant.id) : false

  if (isLoading) {
    return (
      <Layout>
        <ProductSkeleton />
      </Layout>
    )
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
    )
  }

  return (
    <Layout>
      {/* Cart component */}
      {/* Breadcrumb */}
      <ProductBreadcrumb product={product} />

      <div className="container-custom py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left column - Product images */}
          <div className="w-full lg:w-1/2">
            <ProductImageGallery images={product.images} alt={product.title} />
          </div>

          {/* Right column - Product info */}
          <div className="w-full lg:w-1/2">
            <ProductInfo
              title={product.title}
              price={selectedVariant?.price}
              compareAtPrice={selectedVariant?.compareAtPrice}
              currency={selectedVariant?.currency || "AED"}
              description={product.description}
              sku={selectedVariant?.sku}
            />

            {/* Color selector */}
            {product.options.map((option: any) => {
              if (option.name.toLowerCase() === "color") {
                return (
                  <ProductColorSelector
                    key={option.id}
                    colors={option.values}
                    selectedColor={selectedOptions[option.name]}
                    onChange={(color) => handleOptionChange(option.name, color)}
                  />
                )
              }
              return null
            })}

            {/* Quantity selector */}
            <ProductQuantitySelector
              quantity={quantity}
              onChange={handleQuantityChange}
              max={selectedVariant?.quantityAvailable || 10}
            />

            {/* Add to cart button */}
            <ProductActions
              onAddToCart={handleAddToCart}
              isInCart={productInCart}
              isAvailable={selectedVariant?.availableForSale}
            />

            {/* Product attributes */}
            <ProductAttributes product={product} />

            {/* Product tabs */}
            <ProductTabs product={product} />

            {/* Product services */}
            <ProductServices />
          </div>
        </div>
      </div>

      {/* Related products */}
      <RelatedProducts currentProductId={product.id} productType={product.type} />
    </Layout>
  )
}

export default Product
