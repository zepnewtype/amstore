"use client"

import * as React from "react"
import { TooltipProvider as RadixTooltipProvider } from "@radix-ui/react-tooltip"

export function TooltipProvider({
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof RadixTooltipProvider>) {
  return <RadixTooltipProvider {...props}>{children}</RadixTooltipProvider>
} 