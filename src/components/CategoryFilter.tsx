
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
          className={`flex items-center space-x-2 whitespace-nowrap ${
            selectedCategory === category.id
              ? 'bg-green-500 hover:bg-green-600 text-white'
              : 'border-gray-300 hover:border-green-400 text-gray-700'
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
