
import React, { useState } from 'react';
import { Filter, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { enhancedFilters } from '@/data/enhancedMockData';

interface EnhancedFiltersProps {
  selectedFilters: string[];
  onFilterChange: (filters: string[]) => void;
  priceRange: [number, number];
  onPriceRangeChange: (range: [number, number]) => void;
}

const EnhancedFilters = ({ 
  selectedFilters, 
  onFilterChange, 
  priceRange, 
  onPriceRangeChange 
}: EnhancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFilter = (filterId: string) => {
    if (selectedFilters.includes(filterId)) {
      onFilterChange(selectedFilters.filter(f => f !== filterId));
    } else {
      onFilterChange([...selectedFilters, filterId]);
    }
  };

  const clearAllFilters = () => {
    onFilterChange([]);
    onPriceRangeChange([0, 1000]);
  };

  const activeFiltersCount = selectedFilters.length + (priceRange[0] > 0 || priceRange[1] < 1000 ? 1 : 0);

  return (
    <div className="mb-6">
      {/* Filter Toggle Button */}
      <div className="flex items-center justify-between mb-4">
        <Button
          variant="outline"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center space-x-2"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
          {activeFiltersCount > 0 && (
            <Badge className="bg-orange-500 text-white text-xs">
              {activeFiltersCount}
            </Badge>
          )}
        </Button>

        {activeFiltersCount > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={clearAllFilters}
            className="text-orange-600 hover:text-orange-700"
          >
            Clear All
          </Button>
        )}
      </div>

      {/* Active Filters Display */}
      {selectedFilters.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-4">
          {selectedFilters.map((filterId) => {
            const filter = enhancedFilters.find(f => f.id === filterId);
            return (
              <Badge
                key={filterId}
                variant="secondary"
                className="bg-orange-100 text-orange-800 hover:bg-orange-200 cursor-pointer"
                onClick={() => toggleFilter(filterId)}
              >
                {filter?.icon} {filter?.name}
                <X className="h-3 w-3 ml-1" />
              </Badge>
            );
          })}
        </div>
      )}

      {/* Filter Panel */}
      {isOpen && (
        <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Category Filters */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Product Type</h3>
              <div className="flex flex-wrap gap-2">
                {enhancedFilters.map((filter) => (
                  <Button
                    key={filter.id}
                    variant="outline"
                    size="sm"
                    onClick={() => toggleFilter(filter.id)}
                    className={`flex items-center space-x-2 ${
                      selectedFilters.includes(filter.id)
                        ? 'bg-orange-100 border-orange-400 text-orange-800'
                        : 'border-gray-300 hover:border-orange-400'
                    }`}
                  >
                    <span>{filter.icon}</span>
                    <span className="text-xs">{filter.name}</span>
                  </Button>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">Price Range</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-4">
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    value={priceRange[1]}
                    onChange={(e) => onPriceRangeChange([priceRange[0], parseInt(e.target.value)])}
                    className="flex-1"
                  />
                </div>
                <div className="flex justify-between text-sm text-gray-600">
                  <span>₹{priceRange[0]}</span>
                  <span>₹{priceRange[1]}+</span>
                </div>
                <div className="flex space-x-2">
                  {[50, 100, 200, 500].map((price) => (
                    <Button
                      key={price}
                      variant="outline"
                      size="sm"
                      onClick={() => onPriceRangeChange([0, price])}
                      className="text-xs"
                    >
                      Under ₹{price}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h3 className="font-semibold text-gray-900 mb-3">Sort By</h3>
            <div className="flex flex-wrap gap-2">
              {[
                'Price: Low to High',
                'Price: High to Low',
                'Customer Rating',
                'Newest First',
                'Discount'
              ].map((sortOption) => (
                <Button
                  key={sortOption}
                  variant="outline"
                  size="sm"
                  className="text-xs border-gray-300 hover:border-orange-400"
                >
                  {sortOption}
                </Button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EnhancedFilters;
