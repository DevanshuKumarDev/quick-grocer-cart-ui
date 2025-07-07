
import React, { useState, useMemo } from 'react';
import { Activity } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import CategoryFilter from '@/components/CategoryFilter';
import NutritionDashboard from '@/components/NutritionDashboard';
import { mockProducts, filters } from '@/data/mockData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [showNutrition, setShowNutrition] = useState(false);

  const filteredProducts = useMemo(() => {
    return mockProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesFilters = selectedFilters.length === 0 || 
                           selectedFilters.every(filter => product.tags.includes(filter));
      
      return matchesSearch && matchesCategory && matchesFilters;
    });
  }, [searchQuery, selectedCategory, selectedFilters]);

  const handleFilterChange = (filterId: string, checked: boolean) => {
    setSelectedFilters(prev =>
      checked
        ? [...prev, filterId]
        : prev.filter(id => id !== filterId)
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header 
        onSearchChange={setSearchQuery} 
        searchQuery={searchQuery}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Filters */}
          <aside className="lg:w-64 space-y-6">
            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Categories</h3>
              <CategoryFilter
                selectedCategory={selectedCategory}
                onCategoryChange={setSelectedCategory}
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm p-4">
              <h3 className="font-semibold text-gray-900 mb-4">Dietary Filters</h3>
              <div className="space-y-3">
                {filters.map((filter) => (
                  <div key={filter.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={filter.id}
                      checked={selectedFilters.includes(filter.id)}
                      onCheckedChange={(checked) => 
                        handleFilterChange(filter.id, checked as boolean)
                      }
                    />
                    <Label
                      htmlFor={filter.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {filter.name}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <Button
              onClick={() => setShowNutrition(true)}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white"
            >
              <Activity className="h-4 w-4 mr-2" />
              Nutrition Dashboard
            </Button>
          </aside>

          {/* Main Content */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-gray-900">
                Fresh Groceries Delivered Fast
              </h1>
              <span className="text-sm text-gray-600">
                {filteredProducts.length} products found
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {filteredProducts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                <p className="text-gray-400 text-sm mt-2">Try adjusting your filters or search terms.</p>
              </div>
            )}
          </div>
        </div>
      </main>

      <NutritionDashboard
        isOpen={showNutrition}
        onClose={() => setShowNutrition(false)}
      />
    </div>
  );
};

export default Index;
