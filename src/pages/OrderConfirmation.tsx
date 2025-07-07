
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, Clock, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const OrderConfirmation = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-20 w-20 rounded-full bg-green-100 mb-6">
            <CheckCircle className="h-10 w-10 text-green-600" />
          </div>
          
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Order Confirmed!</h1>
          <p className="text-lg text-gray-600 mb-8">
            Thank you for your order. We'll start preparing it right away.
          </p>

          <Card className="mb-8 amazon-shadow border border-gray-200">
            <CardContent className="p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Order Details</h2>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Order Number</span>
                  <span className="font-bold text-lg">#QC-{Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
                </div>
                
                <div className="flex items-center justify-between py-3 border-b border-gray-200">
                  <span className="text-gray-600 font-medium">Estimated Delivery</span>
                  <div className="text-right">
                    <p className="font-bold text-lg text-orange-600">20-30 minutes</p>
                    <p className="text-sm text-gray-500">{new Date(Date.now() + 25 * 60 * 1000).toLocaleTimeString()}</p>
                  </div>
                </div>
                
                <div className="flex items-center justify-between py-3">
                  <span className="text-gray-600 font-medium">Delivery Address</span>
                  <div className="text-right">
                    <p className="font-bold">123 Main Street</p>
                    <p className="text-sm text-gray-500">New York, NY 10001</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="bg-orange-50 border border-orange-200 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-orange-600 mr-2" />
              <span className="text-orange-800 font-bold">Express Delivery Active</span>
            </div>
            <p className="text-orange-700 text-sm font-medium">
              Your order will be delivered within 30 minutes. You'll receive SMS updates about your delivery status.
            </p>
          </div>

          <div className="space-y-4">
            <Button
              onClick={() => navigate('/')}
              className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg font-bold"
            >
              <Home className="h-5 w-5 mr-2" />
              Continue Shopping
            </Button>
            
            <Button
              variant="outline"
              onClick={() => window.open('tel:+1234567890')}
              className="w-full border-2 border-gray-300 hover:bg-gray-50 font-medium"
            >
              Contact Support
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrderConfirmation;
