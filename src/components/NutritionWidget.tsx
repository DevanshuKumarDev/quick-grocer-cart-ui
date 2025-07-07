
import React from 'react';
import { useCart } from '@/contexts/CartContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { TrendingUp, Download } from 'lucide-react';

interface NutritionWidgetProps {
  onOpenDashboard: () => void;
}

const NutritionWidget = ({ onOpenDashboard }: NutritionWidgetProps) => {
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

  if (state.items.length === 0) {
    return (
      <Card className="mb-6 border border-gray-200 shadow-sm">
        <CardContent className="p-4 text-center">
          <div className="text-gray-400 text-sm">
            <span className="text-2xl mb-2 block">📊</span>
            Add items to cart to see nutrition summary
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6 border border-green-200 bg-green-50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-bold text-gray-900 flex items-center">
          <span className="mr-2">🏥</span>
          Health Summary
          <Button
            variant="ghost"
            size="sm"
            onClick={onOpenDashboard}
            className="ml-auto text-green-600 hover:text-green-700 hover:bg-green-100"
          >
            <TrendingUp className="h-4 w-4 mr-1" />
            View Details
          </Button>
        </CardTitle>
      </CardHeader>
      
      <CardContent className="pt-0">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">
              {Math.round(totals.calories)}
            </div>
            <div className="text-xs text-gray-600">Calories</div>
          </div>
          <div className="text-center">
            <div className="text-lg font-bold text-blue-600">
              {Math.round(totals.protein)}g
            </div>
            <div className="text-xs text-gray-600">Protein</div>
          </div>
        </div>

        <div className="space-y-2">
          <div>
            <div className="flex justify-between text-xs text-gray-600 mb-1">
              <span>Daily Calories</span>
              <span>{Math.round((totals.calories / dailyGoals.calories) * 100)}%</span>
            </div>
            <Progress 
              value={(totals.calories / dailyGoals.calories) * 100} 
              className="h-2"
            />
          </div>
        </div>

        <Button
          size="sm"
          onClick={onOpenDashboard}
          className="w-full mt-3 bg-green-500 hover:bg-green-600 text-white text-xs"
        >
          <Download className="h-3 w-3 mr-1" />
          Full Health Report
        </Button>
      </CardContent>
    </Card>
  );
};

export default NutritionWidget;
