"use client"

import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface PaginationControlsProps {
  currentPage: number
  totalPages: number
  onPageChange: (page: number) => void
  onShowAll?: () => void
  className?: string
}

export function PaginationControls({
  currentPage,
  totalPages,
  onPageChange,
  onShowAll,
  className,
}: PaginationControlsProps) {
  // Generate page numbers to display
  const getPageNumbers = () => {
    const pages = []
    const maxPagesToShow = 5

    if (totalPages <= maxPagesToShow) {
      // If we have fewer pages than our max, show all pages
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i)
      }
    } else {
      // Always include first page
      pages.push(1)

      // Calculate start and end of page range
      let start = Math.max(2, currentPage - 1)
      let end = Math.min(totalPages - 1, currentPage + 1)

      // Adjust if we're at the beginning
      if (currentPage <= 2) {
        end = 4
      }

      // Adjust if we're at the end
      if (currentPage >= totalPages - 1) {
        start = totalPages - 3
      }

      // Add ellipsis if needed
      if (start > 2) {
        pages.push("...")
      }

      // Add page numbers
      for (let i = start; i <= end; i++) {
        pages.push(i)
      }

      // Add ellipsis if needed
      if (end < totalPages - 1) {
        pages.push("...")
      }

      // Always include last page
      pages.push(totalPages)
    }

    return pages
  }

  return (
    <div className={cn("flex flex-wrap items-center justify-center gap-2", className)}>
      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="h-8 w-8 sm:h-10 sm:w-10"
        aria-label="Previous page"
      >
        <ChevronLeft className="h-4 w-4" />
      </Button>

      {getPageNumbers().map((page, index) =>
        typeof page === "number" ? (
          <Button
            key={index}
            variant={currentPage === page ? "default" : "outline"}
            size="sm"
            onClick={() => onPageChange(page)}
            className={cn(
              "h-8 w-8 sm:h-10 sm:w-10 p-0",
              currentPage === page && "bg-brand-green hover:bg-brand-green/90",
            )}
          >
            {page}
          </Button>
        ) : (
          <span key={index} className="px-1">
            {page}
          </span>
        ),
      )}

      <Button
        variant="outline"
        size="icon"
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="h-8 w-8 sm:h-10 sm:w-10"
        aria-label="Next page"
      >
        <ChevronRight className="h-4 w-4" />
      </Button>

      {onShowAll && (
        <Button variant="outline" size="sm" onClick={onShowAll} className="ml-2 text-xs sm:text-sm">
          Показать все
        </Button>
      )}
    </div>
  )
}
