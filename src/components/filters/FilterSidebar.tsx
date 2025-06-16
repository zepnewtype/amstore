import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

interface FilterSidebarProps {
  filterOptions: {
    productTypes: string[];
    vendors: string[];
    colors: string[];
    tags: string[];
  };
  filters: Record<string, string>;
  setFilters: (filters: Record<string, string>) => void;
}

const FilterSidebar = ({ filterOptions, filters, setFilters }: FilterSidebarProps) => {
  const sections = [
    { id: 'productType', name: 'Product Type', options: filterOptions.productTypes },
    { id: 'vendor', name: 'Vendor', options: filterOptions.vendors },
    { id: 'color', name: 'Color', options: filterOptions.colors },
    // Можно добавить tags, price, inStock и т.д.
  ];

  const [openSections, setOpenSections] = useState<Record<string, boolean>>(
    sections.reduce((acc, filter) => ({ ...acc, [filter.id]: true }), {})
  );

  const toggleSection = (sectionId: string) => {
    setOpenSections(prev => ({
      ...prev,
      [sectionId]: !prev[sectionId]
    }));
  };

  const handleFilterChange = (filterId: string, value: string) => {
    const newFilters = { ...filters };
    if (filters[filterId] === value) {
      delete newFilters[filterId];
    } else {
      newFilters[filterId] = value;
    }
    setFilters(newFilters);
  };

  const clearAllFilters = () => {
    setFilters({});
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-serif">Filter</h2>
        {Object.values(filters).filter(Boolean).length > 0 && (
          <button 
            onClick={clearAllFilters}
            className="text-xs text-brand-green hover:underline"
          >
            Clear all
          </button>
        )}
      </div>
      {sections.map((filter) => (
        <div key={filter.id} className="border-b border-gray-200 pb-4">
          <button
            onClick={() => toggleSection(filter.id)}
            className="flex justify-between items-center w-full py-2 text-left"
          >
            <span className="font-medium">{filter.name}</span>
            <ChevronDown
              size={16}
              className={`transform transition-transform ${openSections[filter.id] ? 'rotate-180' : ''}`}
            />
          </button>
          {openSections[filter.id] && (
            <div className="mt-2 space-y-2">
              {filter.options.map((option) => (
                <label key={option} className="flex items-center">
                  <input
                    type="checkbox"
                    className="mr-2 h-4 w-4 rounded border-gray-300 text-brand-green focus:ring-brand-green"
                    checked={filters[filter.id] === option}
                    onChange={() => handleFilterChange(filter.id, option)}
                  />
                  <span className="text-sm flex-1">{option}</span>
                </label>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FilterSidebar;
