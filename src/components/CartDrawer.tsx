
import React from 'react';
import { X, Plus, Minus, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const navigate = useNavigate();
  const { state, dispatch } = useCart();

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const totalItems = state.items.reduce((sum, item) => sum + item.quantity, 0);
  const deliveryThreshold = 144;
  const currentTotal = state.total;
  const remainingForFreeDelivery = Math.max(0, deliveryThreshold - currentTotal);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={onClose}
      />
      
      {/* Cart Drawer */}
      <div className="fixed right-0 top-0 h-full w-1/2 bg-white z-50 transform transition-transform duration-300 ease-in-out flex flex-col">
        {/* Header */}
        <div className="bg-blue-500 text-white p-4 flex items-center justify-between">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onClose} className="text-white hover:bg-blue-600 mr-2">
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h2 className="text-lg font-semibold">Review your items</h2>
              <div className="flex items-center space-x-2">
                <span className="bg-white text-blue-600 px-2 py-1 rounded font-bold text-sm">
                  ₹{remainingForFreeDelivery > 0 ? remainingForFreeDelivery : 0} ↗
                </span>
                <span className="text-sm">Savings for this order</span>
              </div>
            </div>
          </div>
          <span className="text-sm">{totalItems} items</span>
        </div>

        {/* Items List */}
        <div className="flex-1 overflow-y-auto p-4">
          {state.items.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Your cart is empty</h3>
              <p className="text-gray-600">Add some items to get started!</p>
            </div>
          ) : (
            <div className="space-y-4">
              {state.items.map((item) => (
                <div key={item.id} className="flex items-center space-x-4 bg-gray-50 p-3 rounded-lg">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.src = '/placeholder.svg';
                    }}
                  />
                  
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-600">{item.weight}</p>
                  </div>

                  <div className="flex items-center space-x-2">
                    <div className="flex items-center border border-gray-300 rounded">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="h-8 w-8 p-0 hover:bg-gray-100 text-black"
                      >
                        <Minus className="h-3 w-3" />
                      </Button>
                      <span className="px-3 text-sm font-medium min-w-[24px] text-center">{item.quantity}</span>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="h-8 w-8 p-0 hover:bg-gray-100 text-black"
                      >
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                    <span className="text-sm font-bold text-gray-900">₹{item.price * item.quantity}</span>
                  </div>
                </div>
              ))}

              {/* Free Delivery Banner */}
              {remainingForFreeDelivery > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center">
                  <div className="bg-white rounded-full p-2 mr-3">
                    🚚
                  </div>
                  <div>
                    <div className="font-bold text-gray-800">Get Free delivery</div>
                    <div className="text-sm text-gray-600">Add items worth ₹{remainingForFreeDelivery} more</div>
                  </div>
                </div>
              )}

              {/* You might have missed section */}
              <div className="mt-6">
                <h3 className="font-semibold text-gray-900 mb-4">You might have missed</h3>
                <div className="text-sm text-gray-600 flex items-center mb-4">
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full mr-2">ℹ️</span>
                  Add items worth ₹{remainingForFreeDelivery} more for Free delivery
                </div>
                
                {/* Suggested products grid */}
                <div className="grid grid-cols-5 gap-2">
                  {['Fresh Coriander', 'Fresh Potato', 'Nandini Milk', 'Fresh Chilli', 'Fresh Cucumber'].map((item, index) => (
                    <div key={index} className="text-center bg-white border rounded-lg p-2">
                      <div className="aspect-square bg-gray-100 rounded mb-1"></div>
                      <div className="text-xs font-medium text-gray-900 mb-1">{item}</div>
                      <div className="text-xs text-gray-600 mb-1">₹{15 + index * 5}</div>
                      <Button size="sm" className="bg-yellow-400 hover:bg-yellow-500 text-black text-xs h-6 w-6 p-0 rounded-full">
                        <Plus className="h-3 w-3" />
                      </Button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Bill Summary */}
        {state.items.length > 0 && (
          <div className="border-t bg-white p-4">
            <div className="mb-4">
              <div className="flex items-center mb-2">
                <span className="text-yellow-500 mr-2">⚡</span>
                <span className="font-semibold">Delivery in 10 mins</span>
              </div>
              <p className="text-sm text-gray-600">Deliver to Devanshu - Bengaluru 560048</p>
            </div>

            <Separator className="my-4" />

            <div className="flex justify-between items-center">
              <span className="text-xl font-bold">You pay</span>
              <span className="text-xl font-bold">₹{state.total}</span>
            </div>

            <Button 
              className="w-full mt-4 bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-3 text-lg rounded-lg"
              onClick={() => {
                onClose();
                navigate('/checkout');
              }}
            >
              Proceed to pay
            </Button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
