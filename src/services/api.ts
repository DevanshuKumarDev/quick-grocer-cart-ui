const API_BASE_URL = 'http://localhost:3001/api';

export interface ApiProduct {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  image: string;
  category: string;
  brand: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  nutritionalInfo: {
    calories: number;
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  ingredients: string;
  quantity: string;
  tags: string[];
  discount: number;
}

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ProductsResponse {
  products: ApiProduct[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}

export interface ProductFilters {
  page?: number;
  limit?: number;
  category?: string;
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  brand?: string;
  sortBy?: 'name' | 'price' | 'rating';
  sortOrder?: 'asc' | 'desc';
}

class ApiService {
  private async fetchApi<T>(endpoint: string): Promise<ApiResponse<T>> {
    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('API fetch error:', error);
      throw error;
    }
  }

  async getProducts(filters: ProductFilters = {}): Promise<ApiResponse<ProductsResponse>> {
    const queryParams = new URLSearchParams();
    
    Object.entries(filters).forEach(([key, value]) => {
      if (value !== undefined && value !== null && value !== '') {
        queryParams.append(key, value.toString());
      }
    });

    const queryString = queryParams.toString();
    const endpoint = `/products${queryString ? `?${queryString}` : ''}`;
    
    return this.fetchApi<ProductsResponse>(endpoint);
  }

  async getProduct(id: string): Promise<ApiResponse<ApiProduct>> {
    return this.fetchApi<ApiProduct>(`/products/${id}`);
  }

  async getCategories(): Promise<ApiResponse<string[]>> {
    return this.fetchApi<string[]>('/categories');
  }

  async getBrands(): Promise<ApiResponse<string[]>> {
    return this.fetchApi<string[]>('/brands');
  }

  async getSearchSuggestions(query: string): Promise<ApiResponse<Array<{type: string; text: string; id?: string}>>> {
    return this.fetchApi<Array<{type: string; text: string; id?: string}>>(`/search/suggestions?q=${encodeURIComponent(query)}`);
  }

  async healthCheck(): Promise<ApiResponse<{message: string; timestamp: string; productsLoaded: number}>> {
    return this.fetchApi<{message: string; timestamp: string; productsLoaded: number}>('/health');
  }
}

// Transform API product to frontend product format
export const transformApiProduct = (apiProduct: ApiProduct) => {
  return {
    id: apiProduct.id,
    name: apiProduct.name,
    brand: apiProduct.brand,
    price: apiProduct.price,
    originalPrice: apiProduct.originalPrice,
    weight: apiProduct.quantity,
    image: apiProduct.image,
    category: mapApiCategoryToFrontend(apiProduct.category),
    tags: [...apiProduct.tags, ...generateTagsFromProduct(apiProduct)],
    inStock: apiProduct.inStock,
    description: apiProduct.description,
    rating: apiProduct.rating,
    reviewCount: apiProduct.reviews,
    discountPercentage: apiProduct.discount,
    nutritionFacts: {
      calories: apiProduct.nutritionalInfo.calories,
      protein: apiProduct.nutritionalInfo.protein,
      carbs: apiProduct.nutritionalInfo.carbs,
      fats: apiProduct.nutritionalInfo.fat,
      fiber: apiProduct.nutritionalInfo.fiber,
      sugar: apiProduct.nutritionalInfo.sugar,
      sodium: apiProduct.nutritionalInfo.sodium,
    },
    highlights: generateHighlights(apiProduct),
  };
};

// Map API categories to frontend categories
const mapApiCategoryToFrontend = (apiCategory: string): string => {
  const categoryMap: Record<string, string> = {
    'Beverages': 'beverages',
    'Snacks': 'snacks',
    'Dairy': 'dairy',
    'Bakery': 'bakery',
    'Condiments': 'oils',
    'Frozen': 'frozen',
    'Fresh': 'fresh',
    'General': 'general',
    'Seafood': 'seafood',
    'Biscuits': 'snacks',
    'Chocolate and hazelnuts spreads': 'snacks',
    'Mixed fruit jams': 'condiments',
    'noodles': 'rice',
  };
  
  return categoryMap[apiCategory] || 'general';
};

// Generate additional tags based on product properties
const generateTagsFromProduct = (product: ApiProduct): string[] => {
  const tags: string[] = [];
  
  // Nutritional tags
  if (product.nutritionalInfo.protein > 10) tags.push('protein-rich');
  if (product.nutritionalInfo.fat < 5) tags.push('low-fat');
  if (product.nutritionalInfo.fiber > 5) tags.push('fiber-rich');
  if (product.nutritionalInfo.calories < 100) tags.push('low-calorie');
  
  // Price tags
  if (product.discount > 20) tags.push('discount');
  if (product.originalPrice > product.price * 1.5) tags.push('great-deal');
  
  // Category-based tags
  if (product.category.toLowerCase().includes('organic')) tags.push('organic');
  if (product.name.toLowerCase().includes('fresh')) tags.push('fresh');
  if (product.brand.toLowerCase().includes('premium')) tags.push('premium');
  
  return tags;
};

// Generate product highlights
const generateHighlights = (product: ApiProduct): string[] => {
  const highlights: string[] = [];
  
  // Nutritional highlights
  if (product.nutritionalInfo.protein > 15) {
    highlights.push('High source of protein');
  }
  if (product.nutritionalInfo.fiber > 5) {
    highlights.push('Rich in dietary fiber');
  }
  if (product.nutritionalInfo.calories < 50) {
    highlights.push('Low calorie option');
  }
  
  // Quality highlights
  if (product.rating > 4.5) {
    highlights.push('Highly rated by customers');
  }
  if (product.discount > 25) {
    highlights.push(`${product.discount}% off - Great savings!`);
  }
  
  // Category-specific highlights
  if (product.category === 'Beverages') {
    highlights.push('Perfect for refreshment');
  }
  if (product.category === 'Dairy') {
    highlights.push('Fresh and pure');
  }
  if (product.category === 'Fresh') {
    highlights.push('Farm fresh quality');
  }
  
  // Default highlights if none generated
  if (highlights.length === 0) {
    highlights.push('Premium quality product');
    highlights.push('Perfect for your daily needs');
  }
  
  return highlights.slice(0, 3); // Limit to 3 highlights
};

export const apiService = new ApiService();
export default apiService;
