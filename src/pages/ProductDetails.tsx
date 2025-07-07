
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, ShoppingCart } from 'lucide-react';
import { mockProducts } from '@/data/mockData';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { dispatch } = useCart();
  const [quantity, setQuantity] = useState(1);
  
  const product = mockProducts.find(p => p.id === id);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">Product not found</p>
      </div>
    );
  }

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
    navigate('/cart');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center h-16">
            <Button variant="ghost" onClick={() => navigate(-1)}>
              <ArrowLeft className="h-5 w-5 mr-2" />
              Back
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Product Image */}
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <img
              src={`https://images.unsplash.com/${product.image}?w=600&h=400&fit=crop`}
              alt={product.name}
              className="w-full h-96 object-cover"
            />
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
              <p className="text-lg text-gray-600 mt-2">{product.brand}</p>
              <div className="flex items-center mt-4 space-x-2">
                {product.tags.map((tag) => (
                  <Badge key={tag} variant="secondary" className="bg-green-100 text-green-700">
                    {tag}
                  </Badge>
                ))}
              </div>
            </div>

            <div className="flex items-center justify-between">
              <div className="text-3xl font-bold text-gray-900">${product.price}</div>
              <div className="text-lg text-gray-600">{product.weight}</div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
              <p className="text-gray-600">{product.description}</p>
            </div>

            {/* Quantity Selector */}
            <div className="flex items-center space-x-4">
              <span className="font-medium text-gray-900">Quantity:</span>
              <div className="flex items-center border border-gray-300 rounded-lg">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-3"
                >
                  <Minus className="h-4 w-4" />
                </Button>
                <span className="px-4 py-2 font-medium">{quantity}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-3"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              disabled={!product.inStock}
              className="w-full bg-green-500 hover:bg-green-600 text-white py-3 text-lg"
            >
              <ShoppingCart className="h-5 w-5 mr-2" />
              Add to Cart - ${(product.price * quantity).toFixed(2)}
            </Button>
          </div>
        </div>

        {/* Nutrition Facts */}
        <Card className="mt-8">
          <CardContent className="p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-4">Nutrition Facts</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600">
                  {product.nutritionFacts.calories}
                </div>
                <div className="text-sm text-gray-600">Calories</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">
                  {product.nutritionFacts.protein}g
                </div>
                <div className="text-sm text-gray-600">Protein</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">
                  {product.nutritionFacts.carbs}g
                </div>
                <div className="text-sm text-gray-600">Carbs</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600">
                  {product.nutritionFacts.fats}g
                </div>
                <div className="text-sm text-gray-600">Fats</div>
              </div>
            </div>
            <Separator className="my-4" />
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="text-center">
                <div className="font-medium">{product.nutritionFacts.fiber}g</div>
                <div className="text-gray-600">Fiber</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{product.nutritionFacts.sugar}g</div>
                <div className="text-gray-600">Sugar</div>
              </div>
              <div className="text-center">
                <div className="font-medium">{product.nutritionFacts.sodium}mg</div>
                <div className="text-gray-600">Sodium</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default ProductDetails;
