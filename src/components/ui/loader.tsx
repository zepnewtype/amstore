import type React from "react"
import { cn } from "@/lib/utils"

interface LoaderProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg"
  variant?: "default" | "dots" | "spinner"
}

export function Loader({ size = "md", variant = "default", className, ...props }: LoaderProps) {
  if (variant === "dots") {
    return (
      <div
        className={cn(
          "flex items-center justify-center space-x-2",
          {
            "scale-75": size === "sm",
            "scale-100": size === "md",
            "scale-150": size === "lg",
          },
          className,
        )}
        {...props}
      >
        <div className="animate-bounce delay-75 h-2 w-2 rounded-full bg-brand-green"></div>
        <div className="animate-bounce delay-150 h-2 w-2 rounded-full bg-brand-green"></div>
        <div className="animate-bounce delay-300 h-2 w-2 rounded-full bg-brand-green"></div>
      </div>
    )
  }

  if (variant === "spinner") {
    return (
      <div
        className={cn(
          "inline-block animate-spin rounded-full border-2 border-solid border-current border-e-transparent",
          {
            "h-4 w-4": size === "sm",
            "h-8 w-8": size === "md",
            "h-12 w-12": size === "lg",
          },
          className,
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    )
  }

  return (
    <div
      className={cn(
        "relative",
        {
          "h-5 w-5": size === "sm",
          "h-10 w-10": size === "md",
          "h-16 w-16": size === "lg",
        },
        className,
      )}
      {...props}
    >
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-full w-full animate-pulse rounded-full bg-brand-green/20"></div>
      </div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="h-3/4 w-3/4 animate-spin rounded-full border-2 border-solid border-brand-green border-t-transparent"></div>
      </div>
    </div>
  )
}
