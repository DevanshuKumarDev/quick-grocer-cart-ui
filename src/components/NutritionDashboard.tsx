
import React from 'react';
import { X, Download } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';

interface NutritionDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const NutritionDashboard = ({ isOpen, onClose }: NutritionDashboardProps) => {
  const { state } = useCart();
  
  const totals = state.items.reduce(
    (acc, item) => ({
      calories: acc.calories + item.calories * item.quantity,
      protein: acc.protein + item.protein * item.quantity,
      carbs: acc.carbs + item.carbs * item.quantity,
      fats: acc.fats + item.fats * item.quantity
    }),
    { calories: 0, protein: 0, carbs: 0, fats: 0 }
  );

  const dailyGoals = {
    calories: 2000,
    protein: 50,
    carbs: 300,
    fats: 65
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
          <CardTitle className="text-lg font-semibold text-gray-900">
            Nutrition Summary
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-2">Total from cart items</p>
            <div className="text-3xl font-bold text-green-600">
              {Math.round(totals.calories)} cal
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Calories</span>
                <span className="text-sm text-gray-600">
                  {Math.round(totals.calories)} / {dailyGoals.calories}
                </span>
              </div>
              <Progress 
                value={(totals.calories / dailyGoals.calories) * 100} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Protein</span>
                <span className="text-sm text-gray-600">
                  {Math.round(totals.protein)}g / {dailyGoals.protein}g
                </span>
              </div>
              <Progress 
                value={(totals.protein / dailyGoals.protein) * 100} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Carbs</span>
                <span className="text-sm text-gray-600">
                  {Math.round(totals.carbs)}g / {dailyGoals.carbs}g
                </span>
              </div>
              <Progress 
                value={(totals.carbs / dailyGoals.carbs) * 100} 
                className="h-2"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-700">Fats</span>
                <span className="text-sm text-gray-600">
                  {Math.round(totals.fats)}g / {dailyGoals.fats}g
                </span>
              </div>
              <Progress 
                value={(totals.fats / dailyGoals.fats) * 100} 
                className="h-2"
              />
            </div>
          </div>

          <Button className="w-full bg-green-500 hover:bg-green-600 text-white">
            <Download className="h-4 w-4 mr-2" />
            Download Health Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default NutritionDashboard;
