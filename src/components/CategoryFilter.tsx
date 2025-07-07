
import React from 'react';
import { categories } from '@/data/mockData';
import { Button } from '@/components/ui/button';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
  return (
    <div className="flex space-x-2 overflow-x-auto pb-2 scrollbar-hide">
      {categories.map((category) => (
        <Button
          key={category.id}
          variant={selectedCategory === category.id ? "default" : "outline"}
          size="sm"
          onClick={() => onCategoryChange(category.id)}
          className={`flex items-center space-x-2 whitespace-nowrap font-medium ${
            selectedCategory === category.id
              ? 'bg-orange-500 hover:bg-orange-600 text-white border-orange-500'
              : 'border-gray-300 hover:border-orange-400 text-gray-700 hover:bg-orange-50'
          }`}
        >
          <span>{category.icon}</span>
          <span>{category.name}</span>
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
