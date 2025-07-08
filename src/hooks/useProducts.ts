import { useState, useEffect, useCallback } from 'react';
import { apiService, transformApiProduct, ProductFilters } from '@/services/api';
import { Product } from '@/data/enhancedMockData';

interface UseProductsState {
  products: Product[];
  loading: boolean;
  error: string | null;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalProducts: number;
    hasNext: boolean;
    hasPrev: boolean;
  } | null;
}

interface UseProductsReturn extends UseProductsState {
  fetchProducts: (filters?: ProductFilters) => Promise<void>;
  refetch: () => Promise<void>;
}

export const useProducts = (initialFilters: ProductFilters = {}): UseProductsReturn => {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    loading: true,
    error: null,
    pagination: null,
  });

  const [currentFilters, setCurrentFilters] = useState<ProductFilters>(initialFilters);

  const fetchProducts = useCallback(async (filters: ProductFilters = {}) => {
    setState(prev => ({ ...prev, loading: true, error: null }));
    
    try {
      const response = await apiService.getProducts(filters);
      
      if (response.success) {
        const transformedProducts = response.data.products.map(transformApiProduct);
        
        setState({
          products: transformedProducts,
          loading: false,
          error: null,
          pagination: response.data.pagination,
        });
        
        setCurrentFilters(filters);
      } else {
        setState(prev => ({
          ...prev,
          loading: false,
          error: response.message || 'Failed to fetch products',
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'An unexpected error occurred',
      }));
    }
  }, []);

  const refetch = useCallback(() => {
    return fetchProducts(currentFilters);
  }, [fetchProducts, currentFilters]);

  useEffect(() => {
    fetchProducts(initialFilters);
  }, []); // Only run on mount

  return {
    ...state,
    fetchProducts,
    refetch,
  };
};

// Hook for fetching categories
export const useCategories = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await apiService.getCategories();
        if (response.success) {
          setCategories(response.data);
        } else {
          setError(response.message || 'Failed to fetch categories');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, loading, error };
};

// Hook for fetching brands
export const useBrands = () => {
  const [brands, setBrands] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const response = await apiService.getBrands();
        if (response.success) {
          setBrands(response.data);
        } else {
          setError(response.message || 'Failed to fetch brands');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return { brands, loading, error };
};

// Hook for search suggestions
export const useSearchSuggestions = (query: string, debounceMs: number = 300) => {
  const [suggestions, setSuggestions] = useState<Array<{type: string; text: string; id?: string}>>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.length < 2) {
      setSuggestions([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiService.getSearchSuggestions(query);
        if (response.success) {
          setSuggestions(response.data);
        } else {
          setError(response.message || 'Failed to fetch suggestions');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    }, debounceMs);

    return () => clearTimeout(timeoutId);
  }, [query, debounceMs]);

  return { suggestions, loading, error };
};

// Hook for single product
export const useProduct = (id: string | null) => {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) {
      setProduct(null);
      return;
    }

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await apiService.getProduct(id);
        if (response.success) {
          setProduct(transformApiProduct(response.data));
        } else {
          setError(response.message || 'Failed to fetch product');
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An unexpected error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  return { product, loading, error };
};
