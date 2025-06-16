"use client"

import type React from "react"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface ProductTabsProps {
  description: string
  details?: string[]
  shipping?: string
  returns?: string
}

const ProductTabs = ({
  description,
  details = [],
  shipping = "Free shipping on orders over 500 AED. Standard delivery 4-5 working days.",
  returns = "Returns accepted within 14 days of delivery. Item must be in original condition.",
}: ProductTabsProps) => {
  const [activeTab, setActiveTab] = useState("description")
  const [openAccordion, setOpenAccordion] = useState<string | null>("description")

  const toggleAccordion = (id: string) => {
    setOpenAccordion(openAccordion === id ? null : id)
  }

  // Компонент аккордеона для мобильных устройств
  const AccordionItem = ({ id, title, content }: { id: string; title: string; content: React.ReactNode }) => (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="flex items-center justify-between w-full py-4 text-left"
        onClick={() => toggleAccordion(id)}
        aria-expanded={openAccordion === id}
      >
        <span className="font-medium">{title}</span>
        {openAccordion === id ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
      </button>
      <div
        className={`overflow-hidden transition-all duration-300 ${openAccordion === id ? "max-h-96 pb-4" : "max-h-0"}`}
      >
        {content}
      </div>
    </div>
  )

  return (
    <div className="mt-8">
      {/* Tabs для десктопа */}
      <div className="hidden md:block">
        <Tabs defaultValue="description" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-6">
            <TabsTrigger value="description">Description</TabsTrigger>
            <TabsTrigger value="details">Details</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="returns">Returns</TabsTrigger>
          </TabsList>
          <TabsContent value="description" className="text-sm text-gray-600 leading-relaxed">
            <div dangerouslySetInnerHTML={{ __html: description }} />
          </TabsContent>
          <TabsContent value="details">
            {details.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No additional details available.</p>
            )}
          </TabsContent>
          <TabsContent value="shipping" className="text-sm text-gray-600">
            <p>{shipping}</p>
          </TabsContent>
          <TabsContent value="returns" className="text-sm text-gray-600">
            <p>{returns}</p>
          </TabsContent>
        </Tabs>
      </div>

      {/* Аккордеон для мобильных */}
      <div className="md:hidden">
        <AccordionItem
          id="description"
          title="Description"
          content={
            <div className="text-sm text-gray-600 leading-relaxed" dangerouslySetInnerHTML={{ __html: description }} />
          }
        />
        <AccordionItem
          id="details"
          title="Details"
          content={
            details.length > 0 ? (
              <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
                {details.map((detail, index) => (
                  <li key={index}>{detail}</li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-600">No additional details available.</p>
            )
          }
        />
        <AccordionItem id="shipping" title="Shipping" content={<p className="text-sm text-gray-600">{shipping}</p>} />
        <AccordionItem id="returns" title="Returns" content={<p className="text-sm text-gray-600">{returns}</p>} />
      </div>
    </div>
  )
}

export default ProductTabs
