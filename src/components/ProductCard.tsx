
import React from 'react';
import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Product } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { dispatch } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
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

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="group hover:shadow-lg transition-all duration-200 overflow-hidden border-gray-200 hover:border-green-300">
        <div className="relative">
          <img
            src={`https://images.unsplash.com/${product.image}?w=300&h=200&fit=crop`}
            alt={product.name}
            className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-200"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold">Out of Stock</span>
            </div>
          )}
          <Button
            size="sm"
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className="absolute bottom-2 right-2 bg-green-500 hover:bg-green-600 text-white rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200"
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        
        <CardContent className="p-4">
          <div className="mb-2">
            <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
            <p className="text-sm text-gray-500">{product.brand}</p>
          </div>
          
          <div className="flex items-center justify-between mb-2">
            <span className="text-lg font-bold text-gray-900">${product.price}</span>
            <span className="text-sm text-gray-500">{product.weight}</span>
          </div>
          
          <div className="flex flex-wrap gap-1">
            {product.tags.slice(0, 2).map((tag) => (
              <Badge key={tag} variant="secondary" className="text-xs bg-green-100 text-green-700">
                {tag}
              </Badge>
            ))}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
