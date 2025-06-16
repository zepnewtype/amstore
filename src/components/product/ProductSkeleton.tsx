import { Skeleton } from "@/components/ui/skeleton"

export function ProductSkeleton() {
  return (
    <div className="container-custom py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Image gallery skeleton */}
        <div className="w-full lg:w-1/2">
          <Skeleton className="aspect-square w-full mb-4 rounded-md" />
          <div className="grid grid-cols-4 gap-2">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square w-full rounded-md" />
            ))}
          </div>
        </div>

        {/* Product info skeleton */}
        <div className="w-full lg:w-1/2">
          <Skeleton className="h-8 w-3/4 mb-2" />
          <Skeleton className="h-6 w-1/2 mb-4" />
          <Skeleton className="h-5 w-1/3 mb-6" />

          <div className="space-y-4 mb-6">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          {/* Color options skeleton */}
          <div className="mb-6">
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="flex gap-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-8 rounded-full" />
              ))}
            </div>
          </div>

          {/* Quantity selector skeleton */}
          <div className="mb-6">
            <Skeleton className="h-5 w-24 mb-3" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-10 w-32" />
            </div>
          </div>

          {/* Add to cart button skeleton */}
          <Skeleton className="h-12 w-full mb-6" />

          {/* Tabs skeleton */}
          <div className="space-y-4">
            <Skeleton className="h-10 w-full" />
            <Skeleton className="h-24 w-full" />
          </div>
        </div>
      </div>
    </div>
  )
}
