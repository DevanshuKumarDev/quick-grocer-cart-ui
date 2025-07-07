
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface DietaryPreferencesFilterProps {
  selectedPreferences: string[];
  onPreferenceToggle: (preference: string) => void;
}

const dietaryOptions = [
  { id: 'organic', name: 'Organic', icon: '🌱' },
  { id: 'vegan', name: 'Vegan', icon: '🥬' },
  { id: 'low-calorie', name: 'Low Calorie', icon: '⚡' },
  { id: 'keto', name: 'Keto', icon: '🥑' },
  { id: 'gluten-free', name: 'Gluten Free', icon: '🌾' },
  { id: 'protein-rich', name: 'Protein Rich', icon: '💪' },
  { id: 'low-sugar', name: 'Low Sugar', icon: '🍯' },
  { id: 'high-fiber', name: 'High Fiber', icon: '🌿' },
];

const DietaryPreferencesFilter = ({ selectedPreferences, onPreferenceToggle }: DietaryPreferencesFilterProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-4 mb-6 shadow-sm">
      <div className="flex items-center mb-3">
        <span className="text-lg mr-2">🏥</span>
        <h3 className="font-bold text-gray-900">Dietary Preferences</h3>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {dietaryOptions.map((option) => {
          const isSelected = selectedPreferences.includes(option.id);
          return (
            <Button
              key={option.id}
              variant="outline"
              size="sm"
              onClick={() => onPreferenceToggle(option.id)}
              className={`flex items-center space-x-1 ${
                isSelected 
                  ? 'bg-green-100 border-green-400 text-green-800 hover:bg-green-200' 
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <span className="text-sm">{option.icon}</span>
              <span className="text-xs font-medium">{option.name}</span>
              {isSelected && (
                <Badge className="bg-green-500 text-white text-xs w-4 h-4 rounded-full p-0 flex items-center justify-center ml-1">
                  ✓
                </Badge>
              )}
            </Button>
          );
        })}
      </div>
    </div>
  );
};

export default DietaryPreferencesFilter;
