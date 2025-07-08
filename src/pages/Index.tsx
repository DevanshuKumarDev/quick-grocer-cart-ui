import React, { useState, useMemo, useEffect } from 'react';
import { Clock, MapPin, Star, Plus, Minus, Search, Loader2 } from 'lucide-react';
import Header from '@/components/Header';
import ProductCard from '@/components/ProductCard';
import NutritionWidget from '@/components/NutritionWidget';
import NutritionDashboard from '@/components/NutritionDashboard';
import DietaryPreferencesFilter from '@/components/DietaryPreferencesFilter';
import ProductDetailSheet from '@/components/ProductDetailSheet';
import CartDrawer from '@/components/CartDrawer';
import EnhancedFilters from '@/components/EnhancedFilters';
import { enhancedCategories, Product } from '@/data/enhancedMockData';
import { useProducts, useCategories } from '@/hooks/useProducts';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Switch } from '@/components/ui/switch';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [healthMode, setHealthMode] = useState(false);
  const [selectedDietaryPreferences, setSelectedDietaryPreferences] = useState<string[]>([]);
  const [showNutritionDashboard, setShowNutritionDashboard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductDetail, setShowProductDetail] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const { dispatch, state } = useCart();

  // Use API hooks
  const { products, loading, error, fetchProducts, pagination } = useProducts({
    limit: 20,
    sortBy: 'name',
    sortOrder: 'asc'
  });

  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);

  // Filter products based on user selections
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          product.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesFilters = selectedFilters.length === 0 || 
                           selectedFilters.some(filter => product.tags.includes(filter));
      const matchesDietaryPreferences = selectedDietaryPreferences.length === 0 ||
                                      selectedDietaryPreferences.some(pref => product.tags.includes(pref));
      
      return matchesSearch && matchesFilters && matchesDietaryPreferences;
    });
  }, [allProducts, searchQuery, selectedFilters, selectedDietaryPreferences]);

  // Fetch products when filters change
  useEffect(() => {
    const filters: any = {};
    
    if (searchQuery) filters.search = searchQuery;
    if (selectedCategory !== 'all') filters.category = selectedCategory;
    if (priceRange[0] > 0) filters.minPrice = priceRange[0];
    if (priceRange[1] < 1000) filters.maxPrice = priceRange[1];
    
    setCurrentPage(1);
    setAllProducts([]);
    
    fetchProducts({
      ...filters,
      limit: 20,
      page: 1,
      sortBy: 'name',
      sortOrder: 'asc'
    });
  }, [searchQuery, selectedCategory, priceRange, fetchProducts]);

  // Update allProducts when products change
  useEffect(() => {
    if (currentPage === 1) {
      setAllProducts(products);
    } else {
      setAllProducts(prev => [...prev, ...products]);
    }
  }, [products, currentPage]);

  // Load more products
  const handleLoadMore = async () => {
    if (loadingMore || !pagination?.hasNext) return;
    
    setLoadingMore(true);
    const nextPage = currentPage + 1;
    
    const filters: any = {};
    if (searchQuery) filters.search = searchQuery;
    if (selectedCategory !== 'all') filters.category = selectedCategory;
    if (priceRange[0] > 0) filters.minPrice = priceRange[0];
    if (priceRange[1] < 1000) filters.maxPrice = priceRange[1];
    
    try {
      await fetchProducts({
        ...filters,
        limit: 20,
        page: nextPage,
        sortBy: 'name',
        sortOrder: 'asc'
      });
      setCurrentPage(nextPage);
    } catch (error) {
      console.error('Error loading more products:', error);
    } finally {
      setLoadingMore(false);
    }
  };

  const handleAddToCart = (product: Product) => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
        weight: product.weight,
        calories: product.nutritionFacts.calories,
        protein: product.nutritionFacts.protein,
        carbs: product.nutritionFacts.carbs,
        fats: product.nutritionFacts.fats
      }
    });
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductDetail(true);
  };

  const handleDietaryPreferenceToggle = (preference: string) => {
    setSelectedDietaryPreferences(prev => 
      prev.includes(preference) 
        ? prev.filter(p => p !== preference)
        : [...prev, preference]
    );
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-white">
      {/* Amazon Now Header */}
      <div className="bg-gradient-to-r from-blue-400 to-blue-300 px-4 py-3">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-3 items-center mb-4">
            <div className="flex items-center space-x-2">
              <div className="bg-yellow-400 text-black px-2 py-1 rounded font-bold text-sm flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                10 mins
              </div>
              <div className="text-white">
                Deliver to Bengaluru 560048
              </div>
            </div>
            <div className="text-center">
              <div className="font-bold text-xl">
                <span className="text-black">amazon</span>
                <span className="text-blue-600 ml-1">now</span>
              </div>
            </div>
            <div className="flex justify-end">
              <Button
                variant="ghost"
                onClick={() => setShowCart(true)}
                className="text-white hover:bg-blue-500 relative"
              >
                🛒
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Button>
            </div>
          </div>
          
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search for products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 rounded-md border-0 text-gray-700 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Health Mode Toggle */}
          <div className="flex items-center justify-between mt-4 bg-white bg-opacity-20 rounded-lg px-4 py-2">
            <div className="flex items-center space-x-2">
              <span className="text-white font-medium text-sm">🏥 Health Mode</span>
            </div>
            <Switch 
              checked={healthMode}
              onCheckedChange={setHealthMode}
              className="data-[state=checked]:bg-green-500"
            />
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4">
        {/* Health Mode Components */}
        {healthMode && (
          <>
            <div className="mt-6">
              <NutritionWidget onOpenDashboard={() => setShowNutritionDashboard(true)} />
            </div>
            <DietaryPreferencesFilter 
              selectedPreferences={selectedDietaryPreferences}
              onPreferenceToggle={handleDietaryPreferenceToggle}
            />
          </>
        )}

        {/* Enhanced Filters */}
        <div className="mt-6">
          <EnhancedFilters
            selectedFilters={selectedFilters}
            onFilterChange={setSelectedFilters}
            priceRange={priceRange}
            onPriceRangeChange={setPriceRange}
          />
        </div>

        {/* Savings Banner */}
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg p-6 my-6 text-center border border-blue-200">
          <div className="flex items-center justify-center mb-2">
            <span className="text-2xl mr-2">💰</span>
            <span className="font-bold text-gray-800">UNBELIEVABLE SAVINGS OF</span>
            <span className="text-2xl ml-2">💰</span>
          </div>
          <div className="text-4xl font-bold text-yellow-600 mb-2">₹18,720</div>
          <div className="text-gray-600 font-semibold">IN 1 YEAR*</div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-blue-600 font-bold text-lg mb-1">₹50 CASHBACK</div>
              <div className="text-sm text-gray-600 mb-2">on all orders above ₹399</div>
              <div className="flex justify-between text-sm">
                <span>₹50</span>
                <span>₹10,400</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-blue-600 font-bold text-lg mb-1">FREE DELIVERY</div>
              <div className="text-sm text-gray-600 mb-2">on all orders above ₹199</div>
              <div className="flex justify-between text-sm">
                <span>₹30</span>
                <span>₹6,240</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="text-blue-600 font-bold text-lg mb-1">NO HANDLING FEE</div>
              <div className="text-sm text-gray-600 mb-2">on all orders</div>
              <div className="flex justify-between text-sm">
                <span>₹10</span>
                <span>₹2,080</span>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Categories */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Recommended for you</h2>
          <div className="flex overflow-x-auto space-x-4 pb-4 scrollbar-hide">
            {enhancedCategories.map((category) => (
              <div
                key={category.id}
                className={`flex-shrink-0 text-center cursor-pointer p-3 rounded-lg ${
                  selectedCategory === category.id 
                    ? 'bg-blue-100 border-b-2 border-blue-500' 
                    : 'hover:bg-gray-50'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                <div className="text-3xl mb-2">{category.icon}</div>
                <div className="text-xs text-gray-700 font-medium w-20">{category.name}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Free Delivery Banner */}
        <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center">
          <div className="bg-white rounded-full p-2 mr-3">
            🚚
          </div>
          <div>
            <div className="font-bold text-gray-800">Get Free delivery</div>
            <div className="text-sm text-gray-600">Add items worth ₹144 or more</div>
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="flex justify-center items-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
            <span className="ml-2 text-gray-600">Loading fresh products...</span>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 mb-8 text-center">
            <div className="text-red-600 font-semibold mb-2">Unable to load products</div>
            <div className="text-red-500 text-sm mb-4">{error}</div>
            <Button 
              onClick={() => fetchProducts({ limit: 50, sortBy: 'name', sortOrder: 'asc' })}
              className="bg-red-600 hover:bg-red-700"
            >
              Try Again
            </Button>
          </div>
        )}

        {/* Products Grid */}
        {!loading && !error && (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mb-8">
              {filteredProducts.map((product) => (
                <ProductCard 
                  key={product.id} 
                  product={product} 
                  onProductClick={handleProductClick}
                />
              ))}
            </div>

            {/* Load More Button */}
            {pagination?.hasNext && !loading && (
              <div className="text-center mb-8">
                <Button
                  onClick={handleLoadMore}
                  disabled={loadingMore}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin mr-2" />
                      Loading more products...
                    </>
                  ) : (
                    `Load More Products (${pagination.totalProducts - allProducts.length} remaining)`
                  )}
                </Button>
              </div>
            )}

            {/* Products Count Info */}
            {pagination && (
              <div className="text-center text-gray-500 text-sm mb-8">
                Showing {allProducts.length} of {pagination.totalProducts} products
              </div>
            )}
          </>
        )}

        {/* Promotional Banner */}
        <div className="bg-gradient-to-r from-blue-400 to-blue-500 rounded-lg p-6 mb-8 text-white text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="mr-4">
              <div className="text-2xl mb-2">🌧️</div>
            </div>
            <div>
              <h3 className="text-xl font-bold mb-2">Monsoon must-haves</h3>
              <p className="text-blue-100 mb-4">- UP TO 70% OFF -</p>
              <Button className="bg-white text-blue-600 hover:bg-gray-100 font-bold">
                Order now
              </Button>
            </div>
            <div className="ml-4">
              <div className="text-2xl mb-2">👧</div>
            </div>
          </div>
          
          <div className="grid grid-cols-5 gap-4 mt-6">
            {['Rain Protection', 'Tea & Coffee', 'Powerful Essentials', 'Maggie & More', 'Cough & Cold Care'].map((item) => (
              <div key={item} className="bg-white bg-opacity-20 rounded-lg p-3">
                <div className="text-xs font-medium">{item}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 text-sm">
            <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold mr-2">⚡</span>
            NO ADDITIONAL CHARGES DURING RAINY WEATHER
            <span className="bg-yellow-400 text-black px-2 py-1 rounded font-bold ml-2">⚡</span>
          </div>
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg mb-2">No products found matching your criteria.</p>
            <p className="text-gray-400 text-sm">Try adjusting your search terms or filters.</p>
          </div>
        )}
      </main>

      {/* Product Detail Sheet */}
      <ProductDetailSheet
        product={selectedProduct}
        isOpen={showProductDetail}
        onClose={() => setShowProductDetail(false)}
      />

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={showCart}
        onClose={() => setShowCart(false)}
      />

      {/* Nutrition Dashboard Modal */}
      <NutritionDashboard 
        isOpen={showNutritionDashboard}
        onClose={() => setShowNutritionDashboard(false)}
      />
    </div>
  );
};

export default Index;
