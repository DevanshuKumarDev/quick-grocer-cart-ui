// Nutrition API service
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export interface NutritionData {
  start_date: number;
  end_date: number;
  total_orders: number;
  total_days: number;
  healthy_score: number;
  unhealthy_score: number;
  nutrition_analysis: {
    total_calories: number;
    daily_average_calories: number;
    total_protein: number;
    total_fat: number;
    total_carbohydrates: number;
    total_fiber: number;
    protein_percentage: number;
    fat_percentage: number;
    carb_percentage: number;
  };
  food_breakdown: Array<{
    name: string;
    quantity: number;
    calories: number;
    protein: number;
    fat: number;
    carbohydrates: number;
    fiber: number;
    health_category: 'healthy' | 'moderate' | 'unhealthy';
  }>;
  recommendations: Array<{
    category: string;
    message: string;
    suggested_foods: string[];
    priority: 'low' | 'medium' | 'high';
  }>;
  ai_summary: string;
  deficiencies: string[];
  excesses: string[];
}

export class NutritionApiService {
  private static instance: NutritionApiService;

  private constructor() {}

  public static getInstance(): NutritionApiService {
    if (!NutritionApiService.instance) {
      NutritionApiService.instance = new NutritionApiService();
    }
    return NutritionApiService.instance;
  }

  /**
   * Fetch nutrition analysis data from the API
   * @param startDate - Start date in YYYY-MM-DD format
   * @param endDate - End date in YYYY-MM-DD format
   * @returns Promise<NutritionData>
   */
  async getNutritionAnalysis(startDate?: string, endDate?: string): Promise<NutritionData> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);

      const response = await fetch(`${API_BASE_URL}/reports/health?${params.toString()}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any authentication headers here if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NutritionData = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching nutrition analysis:', error);
      throw new Error('Failed to fetch nutrition analysis. Please try again later.');
    }
  }

  /**
   * Get user's nutrition history
   * @param limit - Number of records to fetch
   * @returns Promise<NutritionData[]>
   */
  async getNutritionHistory(limit: number = 10): Promise<NutritionData[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/nutrition/history?limit=${limit}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: NutritionData[] = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching nutrition history:', error);
      throw new Error('Failed to fetch nutrition history. Please try again later.');
    }
  }

  /**
   * Download nutrition report as PDF
   * @param startDate - Start date in YYYYMMDD format
   * @param endDate - End date in YYYYMMDD format
   * @returns Promise<Blob>
   */
  async downloadNutritionReport(startDate?: string, endDate?: string): Promise<Blob> {
    try {
      const params = new URLSearchParams();
      if (startDate) params.append('start_date', startDate);
      if (endDate) params.append('end_date', endDate);

      const response = await fetch(`${API_BASE_URL}/nutrition/report/download?${params.toString()}`, {
        method: 'GET',
        headers: {
          // Add any authentication headers here if needed
          // 'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const blob = await response.blob();
      return blob;
    } catch (error) {
      console.error('Error downloading nutrition report:', error);
      throw new Error('Failed to download nutrition report. Please try again later.');
    }
  }

  /**
   * Update user's nutrition preferences
   * @param preferences - User's nutrition preferences
   * @returns Promise<void>
   */
  async updateNutritionPreferences(preferences: {
    daily_calorie_goal?: number;
    protein_goal?: number;
    carb_goal?: number;
    fat_goal?: number;
    fiber_goal?: number;
    dietary_restrictions?: string[];
  }): Promise<void> {
    try {
      const response = await fetch(`${API_BASE_URL}/nutrition/preferences`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(preferences),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error updating nutrition preferences:', error);
      throw new Error('Failed to update nutrition preferences. Please try again later.');
    }
  }
}

// Export a singleton instance
export const nutritionApiService = NutritionApiService.getInstance();

// Mock data for development/testing
export const mockNutritionData: NutritionData = {
  "start_date": 20250701,
  "end_date": 20250705,
  "total_orders": 5,
  "total_days": 5,
  "healthy_score": 7.7,
  "unhealthy_score": 2.3,
  "nutrition_analysis": {
    "total_calories": 3268.0,
    "daily_average_calories": 653.6,
    "total_protein": 180.0,
    "total_fat": 100.7,
    "total_carbohydrates": 421.7,
    "total_fiber": 33.6,
    "protein_percentage": 25.6,
    "fat_percentage": 14.3,
    "carb_percentage": 60.0
  },
  "food_breakdown": [
    {
      "name": "Chicken",
      "quantity": 2,
      "calories": 330.0,
      "protein": 62.0,
      "fat": 7.2,
      "carbohydrates": 0.0,
      "fiber": 0.0,
      "health_category": "healthy"
    },
    {
      "name": "Rice",
      "quantity": 2,
      "calories": 260.0,
      "protein": 5.4,
      "fat": 0.6,
      "carbohydrates": 56.0,
      "fiber": 0.8,
      "health_category": "moderate"
    },
    {
      "name": "Vegetables",
      "quantity": 2,
      "calories": 50.0,
      "protein": 3.0,
      "fat": 0.4,
      "carbohydrates": 10.0,
      "fiber": 6.0,
      "health_category": "healthy"
    },
    {
      "name": "Coffee",
      "quantity": 1,
      "calories": 2.0,
      "protein": 0.3,
      "fat": 0.0,
      "carbohydrates": 0.0,
      "fiber": 0.0,
      "health_category": "healthy"
    },
    {
      "name": "Sugar",
      "quantity": 2,
      "calories": 774.0,
      "protein": 0.0,
      "fat": 0.0,
      "carbohydrates": 200.0,
      "fiber": 0.0,
      "health_category": "moderate"
    },
    {
      "name": "Cream",
      "quantity": 1,
      "calories": 345.0,
      "protein": 2.8,
      "fat": 37.0,
      "carbohydrates": 2.8,
      "fiber": 0.0,
      "health_category": "unhealthy"
    },
    {
      "name": "Pasta",
      "quantity": 2,
      "calories": 262.0,
      "protein": 10.0,
      "fat": 2.2,
      "carbohydrates": 50.0,
      "fiber": 3.6,
      "health_category": "healthy"
    },
    {
      "name": "Tomato Sauce",
      "quantity": 1,
      "calories": 29.0,
      "protein": 1.6,
      "fat": 0.2,
      "carbohydrates": 7.0,
      "fiber": 1.4,
      "health_category": "healthy"
    },
    {
      "name": "Cheese",
      "quantity": 1,
      "calories": 113.0,
      "protein": 7.0,
      "fat": 9.0,
      "carbohydrates": 1.0,
      "fiber": 0.0,
      "health_category": "moderate"
    },
    {
      "name": "Fish",
      "quantity": 1,
      "calories": 206.0,
      "protein": 22.0,
      "fat": 12.0,
      "carbohydrates": 0.0,
      "fiber": 0.0,
      "health_category": "moderate"
    },
    {
      "name": "Lemon",
      "quantity": 3,
      "calories": 87.0,
      "protein": 3.3,
      "fat": 0.9,
      "carbohydrates": 27.0,
      "fiber": 8.4,
      "health_category": "healthy"
    },
    {
      "name": "Herbs",
      "quantity": 1,
      "calories": 36.0,
      "protein": 3.3,
      "fat": 0.7,
      "carbohydrates": 6.9,
      "fiber": 3.9,
      "health_category": "healthy"
    },
    {
      "name": "Beef",
      "quantity": 2,
      "calories": 500.0,
      "protein": 52.0,
      "fat": 30.0,
      "carbohydrates": 0.0,
      "fiber": 0.0,
      "health_category": "moderate"
    },
    {
      "name": "Onions",
      "quantity": 3,
      "calories": 120.0,
      "protein": 3.3,
      "fat": 0.3,
      "carbohydrates": 27.0,
      "fiber": 5.1,
      "health_category": "healthy"
    },
    {
      "name": "Potatoes",
      "quantity": 2,
      "calories": 154.0,
      "protein": 4.0,
      "fat": 0.2,
      "carbohydrates": 34.0,
      "fiber": 4.4,
      "health_category": "healthy"
    }
  ],
  "recommendations": [
    {
      "category": "deficiency",
      "message": "**1. Foods to Address Deficiencies:**",
      "suggested_foods": [
        "Foods to Address Deficiencies"
      ],
      "priority": "medium"
    },
    {
      "category": "deficiency",
      "message": "* **Category:** Deficiency (Calories & Protein)\n* **Message:** Your current diet is severely lacking in calories and protein, essential for energy levels and muscle maintenance. Increasing these will ...",
      "suggested_foods": [
        "protein",
        "protein",
        "calorie",
        "protein",
        "calorie"
      ],
      "priority": "medium"
    },
    {
      "category": "deficiency",
      "message": "* **Category:** Deficiency (Fiber)\n* **Message:**  Adequate fiber intake is crucial for digestion and overall gut health.  Your current intake is low.\n* **Suggestions:**\n    * **Legumes (Beans, Lentil...",
      "suggested_foods": [
        "grain Bread",
        "wheat or multigrain bread instead of refined white bread"
      ],
      "priority": "medium"
    },
    {
      "category": "alternative",
      "message": "**2. Healthier Alternatives for Current Foods:**",
      "suggested_foods": [
        "Healthier Alternatives for Current Foods"
      ],
      "priority": "medium"
    },
    {
      "category": "alternative",
      "message": "* **Category:** Alternative (Cream)\n* **Message:**  Cream is high in unhealthy saturated fat and calories. Reducing or replacing it is important for heart health and weight management.\n* **Suggestions...",
      "suggested_foods": [
        "fat alternative to cream"
      ],
      "priority": "high"
    }
  ],
  "ai_summary": "Over the past five days, you've maintained a relatively healthy eating pattern, evidenced by a strong 7.7/10 healthy score and good fiber intake.  While your calorie intake is quite low (654 average),  increasing your daily caloric target to support your activity level and overall health goals would be beneficial, potentially by focusing on adding more healthy fats and lean protein sources.",
  "deficiencies": [
    "calories",
    "protein",
    "fiber"
  ],
  "excesses": []
};
