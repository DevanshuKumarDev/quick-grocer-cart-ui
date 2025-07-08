import React, { useState, useEffect } from 'react';
import { X, Download, TrendingUp, TrendingDown, AlertCircle, CheckCircle, Target, Calendar, BarChart3, Lightbulb, Apple, Zap, CalendarIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar as CalendarComponent } from '@/components/ui/calendar';
import { nutritionApiService, mockNutritionData, type NutritionData } from '@/services/nutritionApi';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface NutritionDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const NutritionDashboard = ({ isOpen, onClose }: NutritionDashboardProps) => {
  const [nutritionData, setNutritionData] = useState<NutritionData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [startDate, setStartDate] = useState<Date | undefined>(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)); // 7 days ago
  const [endDate, setEndDate] = useState<Date | undefined>(new Date()); // Today
  const [error, setError] = useState<string | null>(null);

  // Fetch nutrition data when dashboard opens or dates change
  useEffect(() => {
    if (isOpen && startDate && endDate) {
      fetchNutritionData();
    }
  }, [isOpen, startDate, endDate]);

  const fetchNutritionData = async () => {
    if (!startDate || !endDate) return;

    setIsLoading(true);
    setError(null);

    try {
      // Format dates for API (YYYYMMDD)
      const formattedStartDate = format(startDate, 'yyyyMMdd');
      const formattedEndDate = format(endDate, 'yyyyMMdd');

      // Use real API call
      const data = await nutritionApiService.getNutritionAnalysis(formattedStartDate, formattedEndDate);
      setNutritionData(data);
    } catch (error) {
      console.error('Error fetching nutrition data:', error);
      setError('Failed to load nutrition data. Using sample data instead.');
      
      // Fallback to mock data if API fails
      setNutritionData(mockNutritionData);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRefresh = () => {
    fetchNutritionData();
  };

  // Handle download functionality
  const handleDownloadReport = async () => {
    try {
      // For now, show alert. Replace with actual download:
      // const blob = await nutritionApiService.downloadNutritionReport();
      // const url = URL.createObjectURL(blob);
      // const a = document.createElement('a');
      // a.href = url;
      // a.download = 'nutrition-report.pdf';
      // document.body.appendChild(a);
      // a.click();
      // document.body.removeChild(a);
      // URL.revokeObjectURL(url);
      
      alert('Download functionality will be implemented when API is ready!');
    } catch (error) {
      console.error('Error downloading report:', error);
      alert('Failed to download report. Please try again.');
    }
  };

  const formatDate = (dateNum: number) => {
    const dateStr = dateNum.toString();
    const year = dateStr.slice(0, 4);
    const month = dateStr.slice(4, 6);
    const day = dateStr.slice(6, 8);
    return `${month}/${day}/${year}`;
  };

  const getHealthCategoryColor = (category: string) => {
    switch (category) {
      case 'healthy':
        return 'bg-green-100 text-green-800';
      case 'moderate':
        return 'bg-yellow-100 text-yellow-800';
      case 'unhealthy':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'low':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl max-h-[95vh] overflow-y-auto bg-white rounded-lg shadow-xl">
        <div className="sticky top-0 bg-white border-b px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <BarChart3 className="h-6 w-6 text-green-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nutrition Dashboard</h2>
              <p className="text-sm text-gray-600">
                {nutritionData && `${formatDate(nutritionData.start_date)} - ${formatDate(nutritionData.end_date)}`}
              </p>
            </div>
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Date Selection Section */}
        <div className="bg-gray-50 border-b px-6 py-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <h3 className="text-sm font-medium text-gray-700">Select Date Range:</h3>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {/* Start Date Picker */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">From:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !startDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {startDate ? format(startDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* End Date Picker */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600">To:</span>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-[140px] justify-start text-left font-normal",
                        !endDate && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {endDate ? format(endDate, "MMM dd, yyyy") : "Select date"}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) => date > new Date() || date < new Date("1900-01-01") || (startDate && date < startDate)}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Refresh Button */}
              <Button 
                onClick={handleRefresh} 
                size="sm" 
                className="bg-blue-600 hover:bg-blue-700"
                disabled={isLoading || !startDate || !endDate}
              >
                {isLoading ? "Loading..." : "Generate Report"}
              </Button>
            </div>
          </div>

          {/* Error Message */}
          {error && (
            <Alert className="mt-3 border-yellow-200 bg-yellow-50">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-800">
                {error}
              </AlertDescription>
            </Alert>
          )}
        </div>

        {isLoading ? (
          <div className="p-8 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-600 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading your nutrition insights...</p>
          </div>
        ) : nutritionData ? (
          <div className="p-6">
            {/* Health Score Overview */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card className="bg-gradient-to-r from-green-50 to-green-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-green-500 rounded-full">
                      <TrendingUp className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Healthy Score</p>
                      <p className="text-2xl font-bold text-green-600">{nutritionData.healthy_score}/10</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-blue-50 to-blue-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-500 rounded-full">
                      <Zap className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Daily Avg Calories</p>
                      <p className="text-2xl font-bold text-blue-600">{Math.round(nutritionData.nutrition_analysis.daily_average_calories)}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-purple-50 to-purple-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-purple-500 rounded-full">
                      <Calendar className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Total Orders</p>
                      <p className="text-2xl font-bold text-purple-600">{nutritionData.total_orders}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="bg-gradient-to-r from-orange-50 to-orange-100">
                <CardContent className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-orange-500 rounded-full">
                      <Target className="h-4 w-4 text-white" />
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Analysis Days</p>
                      <p className="text-2xl font-bold text-orange-600">{nutritionData.total_days}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* AI Summary */}
            <Card className="mb-6 bg-gradient-to-r from-indigo-50 to-blue-50 border-indigo-200">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-indigo-700">
                  <Lightbulb className="h-5 w-5" />
                  AI Health Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{nutritionData.ai_summary}</p>
              </CardContent>
            </Card>

            <Tabs defaultValue="overview" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="breakdown">Food Breakdown</TabsTrigger>
                <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
                <TabsTrigger value="deficiencies">Health Alerts</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                {/* Macronutrient Distribution */}
                <Card>
                  <CardHeader>
                    <CardTitle>Macronutrient Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-3">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200"/>
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${nutritionData.nutrition_analysis.protein_percentage * 2.51} 251`} className="text-blue-500"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-blue-600">{nutritionData.nutrition_analysis.protein_percentage}%</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">Protein</h3>
                        <p className="text-sm text-gray-600">{Math.round(nutritionData.nutrition_analysis.total_protein)}g total</p>
                      </div>

                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-3">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200"/>
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${nutritionData.nutrition_analysis.carb_percentage * 2.51} 251`} className="text-green-500"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-green-600">{nutritionData.nutrition_analysis.carb_percentage}%</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">Carbs</h3>
                        <p className="text-sm text-gray-600">{Math.round(nutritionData.nutrition_analysis.total_carbohydrates)}g total</p>
                      </div>

                      <div className="text-center">
                        <div className="relative w-24 h-24 mx-auto mb-3">
                          <svg className="w-24 h-24 transform -rotate-90">
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-gray-200"/>
                            <circle cx="48" cy="48" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" strokeDasharray={`${nutritionData.nutrition_analysis.fat_percentage * 2.51} 251`} className="text-yellow-500"/>
                          </svg>
                          <div className="absolute inset-0 flex items-center justify-center">
                            <span className="text-lg font-bold text-yellow-600">{nutritionData.nutrition_analysis.fat_percentage}%</span>
                          </div>
                        </div>
                        <h3 className="font-semibold text-gray-800">Fats</h3>
                        <p className="text-sm text-gray-600">{Math.round(nutritionData.nutrition_analysis.total_fat)}g total</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Additional Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Total Nutrition</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Calories</span>
                        <span className="font-bold text-lg">{Math.round(nutritionData.nutrition_analysis.total_calories)}</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-gray-700">Total Fiber</span>
                        <span className="font-bold text-lg">{Math.round(nutritionData.nutrition_analysis.total_fiber)}g</span>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Health Score Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-green-700">Healthy Score</span>
                          <span className="text-sm text-green-600">{nutritionData.healthy_score}/10</span>
                        </div>
                        <Progress value={nutritionData.healthy_score * 10} className="h-2" />
                      </div>
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-sm font-medium text-red-700">Unhealthy Score</span>
                          <span className="text-sm text-red-600">{nutritionData.unhealthy_score}/10</span>
                        </div>
                        <Progress value={nutritionData.unhealthy_score * 10} className="h-2" />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="breakdown" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Food Items Analysis</CardTitle>
                    <p className="text-sm text-gray-600">Detailed breakdown of your food consumption</p>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {nutritionData.food_breakdown.map((food, index) => (
                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="p-2 bg-white rounded-full shadow-sm">
                              <Apple className="h-4 w-4 text-gray-600" />
                            </div>
                            <div>
                              <h4 className="font-medium text-gray-900">{food.name}</h4>
                              <p className="text-sm text-gray-600">Quantity: {food.quantity}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <p className="text-sm font-medium">{Math.round(food.calories)} cal</p>
                              <p className="text-xs text-gray-600">
                                P: {Math.round(food.protein)}g | C: {Math.round(food.carbohydrates)}g | F: {Math.round(food.fat)}g
                              </p>
                            </div>
                            <Badge className={getHealthCategoryColor(food.health_category)}>
                              {food.health_category}
                            </Badge>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="recommendations" className="space-y-4">
                {nutritionData.recommendations.map((rec, index) => (
                  <Alert key={index} className={`border ${getPriorityColor(rec.priority)}`}>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <div className="space-y-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getPriorityColor(rec.priority)}>
                            {rec.priority} priority
                          </Badge>
                          <Badge variant="outline">
                            {rec.category}
                          </Badge>
                        </div>
                        <p className="text-gray-700">{rec.message}</p>
                        {rec.suggested_foods.length > 0 && (
                          <div className="mt-2">
                            <p className="text-sm font-medium text-gray-800 mb-1">Suggested foods:</p>
                            <div className="flex flex-wrap gap-1">
                              {rec.suggested_foods.map((food, foodIndex) => (
                                <Badge key={foodIndex} variant="secondary" className="text-xs">
                                  {food}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </AlertDescription>
                  </Alert>
                ))}
              </TabsContent>

              <TabsContent value="deficiencies" className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {nutritionData.deficiencies.length > 0 && (
                    <Card className="border-red-200 bg-red-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-red-700">
                          <TrendingDown className="h-5 w-5" />
                          Nutritional Deficiencies
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {nutritionData.deficiencies.map((def, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-red-500" />
                              <span className="text-red-700 capitalize">{def}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  {nutritionData.excesses.length > 0 ? (
                    <Card className="border-orange-200 bg-orange-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-orange-700">
                          <TrendingUp className="h-5 w-5" />
                          Nutritional Excesses
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2">
                          {nutritionData.excesses.map((excess, index) => (
                            <div key={index} className="flex items-center gap-2">
                              <AlertCircle className="h-4 w-4 text-orange-500" />
                              <span className="text-orange-700 capitalize">{excess}</span>
                            </div>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ) : (
                    <Card className="border-green-200 bg-green-50">
                      <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-green-700">
                          <CheckCircle className="h-5 w-5" />
                          Great News!
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-green-700">No nutritional excesses detected. You're maintaining a balanced diet!</p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </TabsContent>
            </Tabs>

            {/* Download Button */}
            <div className="mt-8 text-center">
              <Button 
                onClick={handleDownloadReport}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
              >
                <Download className="h-5 w-5 mr-2" />
                Download Complete Health Report
              </Button>
            </div>
          </div>
        ) : (
          <div className="p-8 text-center">
            <p className="text-gray-600">No nutrition data available</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionDashboard;
