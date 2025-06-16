"use client"

interface ColorOption {
  color: string
  image?: string
}

interface ProductColorSelectorProps {
  colorOptions: ColorOption[]
  selectedColor: string
  onColorChange: (color: string, image?: string) => void
}

const ProductColorSelector = ({ colorOptions, selectedColor, onColorChange }: ProductColorSelectorProps) => {
  if (!colorOptions || colorOptions.length === 0) return null

  return (
    <div className="mt-6">
      <label className="block text-sm font-medium text-gray-700 mb-2">
        Color: <span className="font-normal">{selectedColor}</span>
      </label>
      <div className="flex flex-wrap gap-3">
        {colorOptions.map((option, index) => (
          <button
            key={index}
            type="button"
            onClick={() => onColorChange(option.color, option.image)}
            className={`relative w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden border-2 transition-all ${
              selectedColor === option.color
                ? "border-brand-green ring-2 ring-brand-green/30"
                : "border-gray-200 hover:border-gray-300"
            }`}
            aria-label={`Select color ${option.color}`}
            title={option.color}
          >
            {option.image ? (
              <img src={option.image || "/placeholder.svg"} alt={option.color} className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full" style={{ backgroundColor: option.color.toLowerCase() }} />
            )}

            {/* Индикатор выбранного цвета */}
            {selectedColor === option.color && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/10">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  )
}

export default ProductColorSelector
