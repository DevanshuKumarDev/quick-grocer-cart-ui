
import React, { useState } from 'react';
import { Plus, Minus } from 'lucide-react';
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
  const [quantity, setQuantity] = useState(0);

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
    setQuantity(quantity + 1);
  };

  const handleQuantityChange = (change: number) => {
    const newQuantity = Math.max(0, quantity + change);
    setQuantity(newQuantity);
  };

  // Generate random discount percentage
  const discountPercentage = Math.floor(Math.random() * 50 + 10);
  const originalPrice = Math.floor(product.price * 1.3);

  return (
    <Link to={`/product/${product.id}`}>
      <Card className="relative overflow-hidden hover:shadow-lg transition-all duration-200 border border-gray-200">
        {/* Discount Badge */}
        <div className="absolute top-2 left-2 z-10">
          <Badge className="bg-orange-500 text-white font-bold text-xs px-2 py-1">
            {discountPercentage}% OFF
          </Badge>
        </div>
        
        {/* Product Image */}
        <div className="aspect-square bg-gray-50 relative">
          <img
            src={`https://images.unsplash.com/${product.image}?w=250&h=250&fit=crop`}
            alt={product.name}
            className="w-full h-full object-cover"
          />
          {!product.inStock && (
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <span className="text-white font-semibold text-sm">Out of Stock</span>
            </div>
          )}
        </div>
        
        <CardContent className="p-3">
          {/* Product Name */}
          <h3 className="font-semibold text-sm text-gray-900 mb-1 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          
          {/* Brand and Weight */}
          <p className="text-xs text-gray-500 mb-2">{product.weight}</p>
          
          {/* Price Section */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="font-bold text-gray-900">₹{product.price}</span>
            <span className="text-xs text-gray-400 line-through">₹{originalPrice}</span>
          </div>
          
          {/* Add to Cart Controls */}
          <div className="flex items-center justify-between">
            {quantity === 0 ? (
              <Button
                size="sm"
                onClick={handleAddToCart}
                disabled={!product.inStock}
                className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-4 py-1 rounded text-xs"
              >
                <Plus className="h-3 w-3 mr-1" />
                Add
              </Button>
            ) : (
              <div className="flex items-center border border-gray-300 rounded">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleQuantityChange(-1);
                  }}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="px-3 text-sm font-medium min-w-[24px] text-center">{quantity}</span>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    handleQuantityChange(1);
                  }}
                  className="h-8 w-8 p-0 hover:bg-gray-100"
                >
                  <Plus className="h-3 w-3" />
                </Button>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
