import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Minus, Search } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { enhancedMockProducts } from '@/data/enhancedMockData';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const Checkout = () => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const handleQuantityChange = (itemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      dispatch({
        type: 'REMOVE_ITEM',
        payload: itemId
      });
    } else {
      dispatch({
        type: 'UPDATE_QUANTITY',
        payload: {
          id: itemId,
          quantity: newQuantity
        }
      });
    }
  };

  const handleAddSuggestedItem = (product: any) => {
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

  const handleProceedToPay = () => {
    // In a real app, this would handle payment processing
    dispatch({ type: 'CLEAR_CART' });
    navigate('/order-confirmation');
  };

  // Calculate totals
  const itemsTotal = state.total;
  const originalTotal = state.items.reduce((sum, item) => {
    const product = enhancedMockProducts.find(p => p.id === item.id);
    return sum + (product ? product.originalPrice * item.quantity : item.price * item.quantity);
  }, 0);
  const savings = originalTotal - itemsTotal;
  const handlingFee = 0; // Free with welcome offer
  const deliveryFee = 0; // Free on orders above ₹199
  const finalTotal = itemsTotal + handlingFee + deliveryFee;

  // Get suggested items (items not in cart)
  const cartItemIds = state.items.map(item => item.id);
  const suggestedItems = enhancedMockProducts
    .filter(product => !cartItemIds.includes(product.id))
    .slice(0, 10);

  if (state.items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <header className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 py-4">
            <div className="flex items-center">
              <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
                <ArrowLeft className="h-5 w-5" />
              </Button>
              <div className="text-center flex-1">
                <div className="font-bold text-xl">
                  <span className="text-black">amazon</span>
                  <span className="text-blue-600 ml-1">now</span>
                </div>
              </div>
              <Search className="h-5 w-5 text-gray-400" />
            </div>
          </div>
        </header>
        <div className="flex items-center justify-center h-96">
          <div className="text-center">
            <p className="text-gray-500 text-lg mb-4">Your cart is empty</p>
            <Button onClick={() => navigate('/')} className="bg-yellow-400 hover:bg-yellow-500 text-black">
              Continue Shopping
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center">
            <Button variant="ghost" onClick={() => navigate('/')} className="mr-4">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div className="text-center flex-1">
              <div className="font-bold text-xl">
                <span className="text-black">amazon</span>
                <span className="text-blue-600 ml-1">now</span>
              </div>
            </div>
            <Search className="h-5 w-5 text-gray-400" />
          </div>
        </div>
      </header>

      {/* Savings Banner */}
      <div className="bg-blue-500 text-white px-4 py-3">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center">
            <span className="mr-2">⭐</span>
            <span className="font-medium">Savings for this order</span>
          </div>
          <div className="font-bold">₹{Math.round(savings)} ↗</div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 py-6">
        {/* Review your items */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-gray-900">Review your items</h2>
            <span className="text-gray-500">{state.items.length} items</span>
          </div>

          <div className="space-y-4">
            {state.items.map((item) => {
              const product = enhancedMockProducts.find(p => p.id === item.id);
              return (
                <div key={item.id} className="flex items-center space-x-4 py-4 border-b border-gray-100">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.name}</h3>
                    <p className="text-sm text-gray-500">{item.weight}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <div className="flex items-center border border-gray-300 rounded">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-3 text-sm font-medium min-w-[24px] text-center">
                        {item.quantity}
                      </span>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-gray-100"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-gray-900">₹{item.price}</div>
                      {product && (
                        <div className="text-xs text-gray-400 line-through">₹{product.originalPrice}</div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* You might have missed */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">You might have missed</h2>
          
          {/* Cashback offer */}
          <div className="bg-gray-100 rounded-lg p-4 mb-6 flex items-center">
            <div className="bg-blue-500 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <span className="text-xs font-bold">₹50</span>
            </div>
            <div>
              <div className="font-bold text-gray-800">Add items worth ₹116 more</div>
              <div className="text-sm text-gray-600">for ₹50 Cashback</div>
            </div>
          </div>

          {/* Suggested items grid */}
          <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-10 gap-4">
            {suggestedItems.map((product) => (
              <Card key={product.id} className="relative overflow-hidden hover:shadow-lg transition-shadow">
                {/* Discount Badge */}
                <div className="absolute top-1 left-1 z-10">
                  <Badge className="bg-orange-500 text-white font-bold text-xs px-1 py-0.5">
                    {product.discountPercentage}% OFF
                  </Badge>
                </div>
                
                <div className="aspect-square bg-gray-100">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                </div>
                
                <CardContent className="p-2">
                  <h3 className="font-medium text-xs text-gray-900 mb-1 line-clamp-2 leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-gray-500 mb-1">{product.weight}</p>
                  
                  <div className="flex items-center justify-between mb-2">
                    <div>
                      <span className="font-bold text-sm">₹{product.price}</span>
                      <span className="text-xs text-gray-400 line-through ml-1">₹{product.originalPrice}</span>
                    </div>
                  </div>
                  
                  <Button
                    size="sm"
                    onClick={() => handleAddSuggestedItem(product)}
                    className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold text-xs py-1"
                  >
                    <Plus className="h-3 w-3 mr-1" />
                    Add
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Bill Summary */}
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Bill summary</h2>
          
          <Card>
            <CardContent className="p-6">
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-700">Items total</span>
                    <span className="text-orange-500 text-sm ml-2">₹{Math.round(savings)} saved</span>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm mr-2">₹{Math.round(originalTotal)}</span>
                    <span className="font-bold">₹{Math.round(itemsTotal)}</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-700">Handling fee</span>
                    <div className="flex items-center text-sm text-blue-500">
                      <span className="mr-1">💙</span>
                      <span>Welcome offer</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm mr-2">₹10</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>
                
                <div className="flex justify-between items-center">
                  <div>
                    <span className="text-gray-700">Delivery fee</span>
                    <div className="text-sm text-gray-500">Free on orders above ₹199</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm mr-2">₹30</span>
                    <span className="font-bold text-green-600">FREE</span>
                  </div>
                </div>
                
                <hr className="my-4" />
                
                <div className="flex justify-between items-center text-lg font-bold">
                  <div>
                    <span>You pay</span>
                    <div className="text-sm text-gray-500 font-normal">Inclusive of taxes</div>
                  </div>
                  <div className="text-right">
                    <span className="text-gray-400 line-through text-sm mr-2">₹{Math.round(originalTotal)}</span>
                    <span>₹{Math.round(finalTotal)}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Savings breakdown */}
        <div className="mb-8">
          <Card className="bg-blue-50 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center mb-4">
                <span className="mr-2">⭐</span>
                <span className="font-bold text-blue-800">You are saving ₹{Math.round(savings)} on this order</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">🏷️</span>
                    <span className="text-gray-700">Discount on MRP</span>
                  </div>
                  <span className="text-blue-600 font-medium">₹{Math.round(savings - 40)}</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">🚚</span>
                    <div>
                      <div className="text-gray-700">Savings on Delivery</div>
                      <div className="text-sm text-gray-500">Free above ₹199 with welcome offer</div>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">₹30</span>
                </div>
                
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="mr-2">📦</span>
                    <div>
                      <div className="text-gray-700">Savings on Handling Fee</div>
                      <div className="text-sm text-gray-500">Free with welcome offer</div>
                    </div>
                  </div>
                  <span className="text-blue-600 font-medium">₹10</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Delivery info */}
        <div className="mb-8">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-center">
            <span className="mr-3">⏰</span>
            <div>
              <div className="font-bold text-gray-800">Delivery in 10 mins</div>
              <div className="text-sm text-gray-600">Deliver to Devanshu - Bengaluru 560048</div>
            </div>
            <Button variant="link" className="ml-auto text-blue-600">Change</Button>
          </div>
        </div>

        {/* Proceed to pay */}
        <div className="text-center">
          <div className="mb-4">
            <span className="text-lg font-bold">You pay</span>
            <span className="text-2xl font-bold ml-2">₹{Math.round(finalTotal)}</span>
          </div>
          <Button
            onClick={handleProceedToPay}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-bold px-8 py-3 rounded-lg text-lg"
          >
            Proceed to pay
          </Button>
        </div>
      </main>
    </div>
  );
};

export default Checkout;
