
import React, { useState } from 'react';
import { X, Plus, Minus, Star } from 'lucide-react';
import { Product } from '@/data/enhancedMockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface ProductDetailSheetProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailSheet = ({ product, isOpen, onClose }: ProductDetailSheetProps) => {
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);

  if (!isOpen || !product) return null;

  const handleAddToCart = () => {
    dispatch({
      type: 'ADD_ITEM',
      payload: {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity,
        image: product.image,
        weight: product.weight,
        calories: product.nutritionFacts.calories,
        protein: product.nutritionFacts.protein,
        carbs: product.nutritionFacts.carbs,
        fats: product.nutritionFacts.fats
      }
    });
    onClose();
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Sheet */}
      <div className="fixed right-0 top-0 h-full w-1/2 bg-white z-50 transform transition-transform duration-300 ease-in-out overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 p-4 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900">Product Details</h2>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Discount Badge */}
          <div className="mb-4">
            <Badge className="bg-orange-500 text-white font-bold">
              {product.discountPercentage}% OFF
            </Badge>
          </div>

          {/* Product Image */}
          <div className="mb-6">
            <img
              src={`https://images.unsplash.com/${product.image}?w=400&h=300&fit=crop`}
              alt={product.name}
              className="w-full h-64 object-cover rounded-lg"
            />
          </div>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              <span className="text-lg font-bold text-gray-900 mr-1">{product.rating}</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`h-4 w-4 ${i < Math.floor(product.rating) ? 'fill-current' : ''}`} 
                  />
                ))}
              </div>
              <span className="text-sm text-gray-500 ml-2">({product.reviewCount})</span>
            </div>
          </div>

          {/* Product Info */}
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.weight}</p>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-6">
            <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
            <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
            <span className="text-sm text-gray-600">₹{Math.round(product.price * 100 / parseInt(product.weight))}/100 g</span>
          </div>

          <p className="text-sm text-gray-600 mb-6">Inclusive of all taxes</p>

          {/* Highlights */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">HIGHLIGHTS</h3>
            <ul className="space-y-2">
              {product.highlights.map((highlight, index) => (
                <li key={index} className="text-sm text-gray-700 flex items-start">
                  <span className="text-green-500 mr-2">•</span>
                  {highlight}
                </li>
              ))}
            </ul>
          </div>

          <Separator className="my-6" />

          {/* Quantity Selector */}
          <div className="mb-6">
            <span className="text-lg font-semibold text-gray-900 mb-3 block">{product.weight}</span>
            <div className="flex items-center space-x-2 mb-4">
              <span className="text-xl font-bold text-gray-900">₹{product.price}</span>
              <span className="text-lg text-gray-400 line-through">₹{product.originalPrice}</span>
              <Badge className="bg-orange-500 text-white">{product.discountPercentage}% OFF</Badge>
            </div>
          </div>

          {/* Add to Cart */}
          <div className="sticky bottom-0 bg-white pt-4 border-t">
            <Button
              onClick={handleAddToCart}
              className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-lg rounded-lg"
            >
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetailSheet;
