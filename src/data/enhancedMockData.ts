
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  originalPrice: number;
  weight: string;
  image: string;
  category: string;
  tags: string[];
  inStock: boolean;
  description: string;
  rating: number;
  reviewCount: number;
  discountPercentage: number;
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  highlights: string[];
}

export const enhancedMockProducts: Product[] = [
  // Fresh Vegetables
  {
    id: '1',
    name: 'Fresh Potato',
    brand: 'Farm Fresh',
    price: 15,
    originalPrice: 21,
    weight: '500 g',
    image: 'photo-1550317138-10000687471',
    category: 'fresh',
    tags: ['organic', 'fresh', 'vegetable'],
    inStock: true,
    description: 'Fresh farm potatoes, perfect for cooking and making snacks.',
    rating: 4.4,
    reviewCount: 280,
    discountPercentage: 28,
    nutritionFacts: { calories: 77, protein: 2, carbs: 17, fats: 0.1, fiber: 2.2, sugar: 0.8, sodium: 6 },
    highlights: ['High source of fibre', 'Good source of Vitamin B6, C, Potassium, and Magnesium', 'Can be used in multiple dishes and snacks']
  },
  {
    id: '2',
    name: 'Fresh Local Tomato',
    brand: 'Local Farm',
    price: 16,
    originalPrice: 31,
    weight: '500 g',
    image: 'photo-1546470427-227ce2b08e76',
    category: 'fresh',
    tags: ['organic', 'fresh', 'vegetable', 'vitamin-c'],
    inStock: true,
    description: 'Fresh locally grown tomatoes, rich in vitamins and perfect for cooking.',
    rating: 4.2,
    reviewCount: 156,
    discountPercentage: 48,
    nutritionFacts: { calories: 18, protein: 0.9, carbs: 3.9, fats: 0.2, fiber: 1.2, sugar: 2.6, sodium: 5 },
    highlights: ['Rich in Vitamin C and Lycopene', 'Fresh and juicy', 'Perfect for salads and cooking']
  },
  {
    id: '3',
    name: 'Fresh Onion',
    brand: 'Farm Fresh',
    price: 13,
    originalPrice: 18,
    weight: '500 g',
    image: 'photo-1508313880080-c4cd99fc5b7d',
    category: 'fresh',
    tags: ['organic', 'fresh', 'vegetable'],
    inStock: true,
    description: 'Premium quality fresh onions for all your cooking needs.',
    rating: 4.1,
    reviewCount: 89,
    discountPercentage: 28,
    nutritionFacts: { calories: 40, protein: 1.1, carbs: 9.3, fats: 0.1, fiber: 1.7, sugar: 4.2, sodium: 4 },
    highlights: ['Essential cooking ingredient', 'Rich in antioxidants', 'Long lasting freshness']
  },
  {
    id: '4',
    name: 'Fresh Coriander (Dhania)',
    brand: 'Green Valley',
    price: 15,
    originalPrice: 31,
    weight: '100 g',
    image: 'photo-1597714026720-8f74c8457d8c',
    category: 'fresh',
    tags: ['organic', 'fresh', 'herbs', 'vitamin-k'],
    inStock: true,
    description: 'Fresh coriander leaves for garnishing and cooking.',
    rating: 4.6,
    reviewCount: 234,
    discountPercentage: 52,
    nutritionFacts: { calories: 23, protein: 2.1, carbs: 3.7, fats: 0.5, fiber: 2.8, sugar: 0.9, sodium: 46 },
    highlights: ['Rich in Vitamin K and C', 'Fresh aromatic leaves', 'Perfect for garnishing']
  },
  {
    id: '5',
    name: 'Fresh Green Chilli',
    brand: 'Spice Farm',
    price: 8,
    originalPrice: 16,
    weight: '100 g',
    image: 'photo-1583056415261-6a4b1e5e2857',
    category: 'fresh',
    tags: ['organic', 'fresh', 'spicy', 'vitamin-c'],
    inStock: true,
    description: 'Fresh green chillies to add spice to your dishes.',
    rating: 4.3,
    reviewCount: 167,
    discountPercentage: 50,
    nutritionFacts: { calories: 40, protein: 1.9, carbs: 9.5, fats: 0.4, fiber: 1.5, sugar: 5.3, sodium: 9 },
    highlights: ['High in Vitamin C', 'Adds natural heat', 'Fresh and crispy']
  },
  // Dairy Products
  {
    id: '6',
    name: 'Heritage Toned Milk',
    brand: 'Heritage',
    price: 26,
    originalPrice: 30,
    weight: '500 ml',
    image: 'photo-1550583943-1a81721f2ff0',
    category: 'dairy',
    tags: ['dairy', 'protein-rich', 'calcium'],
    inStock: true,
    description: 'Fresh toned milk with reduced fat content.',
    rating: 4.5,
    reviewCount: 892,
    discountPercentage: 13,
    nutritionFacts: { calories: 42, protein: 3.4, carbs: 4.8, fats: 1.5, fiber: 0, sugar: 4.8, sodium: 44 },
    highlights: ['Rich in protein and calcium', 'Low fat content', 'Fresh and pure']
  },
  {
    id: '7',
    name: 'Amul Butter',
    brand: 'Amul',
    price: 60,
    originalPrice: 65,
    weight: '100 g',
    image: 'photo-1589985270826-4b7bb135bc9d',
    category: 'dairy',
    tags: ['dairy', 'high-fat', 'vitamin-a'],
    inStock: true,
    description: 'Premium quality butter from Amul.',
    rating: 4.7,
    reviewCount: 1240,
    discountPercentage: 8,
    nutritionFacts: { calories: 717, protein: 0.9, carbs: 0.1, fats: 81, fiber: 0, sugar: 0.1, sodium: 11 },
    highlights: ['Rich creamy taste', 'Made from pure milk', 'Perfect for cooking and spreading']
  },
  // Fruits
  {
    id: '8',
    name: 'Fresh Banana',
    brand: 'Tropical Fresh',
    price: 26,
    originalPrice: 35,
    weight: '500 g',
    image: 'photo-1571771894821-ce9b6c11b08e',
    category: 'fruits',
    tags: ['organic', 'fresh', 'potassium', 'energy'],
    inStock: true,
    description: 'Fresh ripe bananas rich in potassium and natural energy.',
    rating: 4.4,
    reviewCount: 445,
    discountPercentage: 26,
    nutritionFacts: { calories: 89, protein: 1.1, carbs: 23, fats: 0.3, fiber: 2.6, sugar: 12, sodium: 1 },
    highlights: ['High in potassium', 'Natural energy booster', 'Perfect for snacking']
  },
  {
    id: '9',
    name: 'Fresh Apple',
    brand: 'Hill Fresh',
    price: 85,
    originalPrice: 100,
    weight: '500 g',
    image: 'photo-1560806887-1e4cd0b6cbd6',
    category: 'fruits',
    tags: ['organic', 'fresh', 'fiber', 'vitamin-c'],
    inStock: true,
    description: 'Crisp and juicy apples from the hills.',
    rating: 4.6,
    reviewCount: 678,
    discountPercentage: 15,
    nutritionFacts: { calories: 52, protein: 0.3, carbs: 14, fats: 0.2, fiber: 2.4, sugar: 10, sodium: 1 },
    highlights: ['Rich in fiber and Vitamin C', 'Crisp and juicy', 'Perfect for healthy snacking']
  },
  {
    id: '10',
    name: 'Fresh Orange',
    brand: 'Citrus Fresh',
    price: 34,
    originalPrice: 54,
    weight: '500 g',
    image: 'photo-1547514701-42782101795e',
    category: 'fruits',
    tags: ['organic', 'fresh', 'vitamin-c', 'citrus'],
    inStock: true,
    description: 'Juicy oranges packed with Vitamin C.',
    rating: 4.3,
    reviewCount: 234,
    discountPercentage: 37,
    nutritionFacts: { calories: 47, protein: 0.9, carbs: 12, fats: 0.1, fiber: 2.4, sugar: 9, sodium: 0 },
    highlights: ['High in Vitamin C', 'Juicy and sweet', 'Perfect for fresh juice']
  },
  // Rice & Grains
  {
    id: '11',
    name: 'Basmati Rice Premium',
    brand: 'India Gate',
    price: 180,
    originalPrice: 200,
    weight: '1 kg',
    image: 'photo-1586201375761-83865001e31c',
    category: 'rice',
    tags: ['grain', 'basmati', 'premium', 'carbs'],
    inStock: true,
    description: 'Premium quality aged basmati rice with long grains.',
    rating: 4.8,
    reviewCount: 1567,
    discountPercentage: 10,
    nutritionFacts: { calories: 356, protein: 7.1, carbs: 78, fats: 0.9, fiber: 1.8, sugar: 0.1, sodium: 5 },
    highlights: ['Premium aged rice', 'Long grain basmati', 'Perfect for biryanis']
  },
  {
    id: '12',
    name: 'Toor Dal',
    brand: 'Organic Valley',
    price: 120,
    originalPrice: 140,
    weight: '500 g',
    image: 'photo-1596797038530-2c2f54113cac',
    category: 'rice',
    tags: ['dal', 'protein-rich', 'organic', 'fiber'],
    inStock: true,
    description: 'High quality toor dal rich in protein.',
    rating: 4.5,
    reviewCount: 789,
    discountPercentage: 14,
    nutritionFacts: { calories: 343, protein: 22, carbs: 62, fats: 1.5, fiber: 15, sugar: 5.6, sodium: 5 },
    highlights: ['High protein content', 'Rich in fiber', 'Essential amino acids']
  },
  // Oils & Spices
  {
    id: '13',
    name: 'Fortune Sunflower Oil',
    brand: 'Fortune',
    price: 140,
    originalPrice: 160,
    weight: '1 L',
    image: 'photo-1474979266404-7eaacbcd87c5',
    category: 'oils',
    tags: ['oil', 'cooking', 'vitamin-e', 'heart-healthy'],
    inStock: true,
    description: 'Refined sunflower oil for healthy cooking.',
    rating: 4.4,
    reviewCount: 1234,
    discountPercentage: 13,
    nutritionFacts: { calories: 884, protein: 0, carbs: 0, fats: 100, fiber: 0, sugar: 0, sodium: 0 },
    highlights: ['Rich in Vitamin E', 'Heart healthy', 'Light and refined']
  },
  {
    id: '14',
    name: 'MDH Garam Masala',
    brand: 'MDH',
    price: 45,
    originalPrice: 50,
    weight: '100 g',
    image: 'photo-1596040033229-a9821ebd058d',
    category: 'oils',
    tags: ['spice', 'masala', 'aromatic', 'blend'],
    inStock: true,
    description: 'Authentic garam masala blend for perfect flavoring.',
    rating: 4.7,
    reviewCount: 890,
    discountPercentage: 10,
    nutritionFacts: { calories: 379, protein: 14, carbs: 44, fats: 15, fiber: 26, sugar: 3, sodium: 67 },
    highlights: ['Authentic Indian spice blend', 'Rich aroma and flavor', 'Perfect for all dishes']
  },
  // Beverages
  {
    id: '15',
    name: 'Coca Cola',
    brand: 'Coca Cola',
    price: 35,
    originalPrice: 40,
    weight: '600 ml',
    image: 'photo-1554866585-cd94860890b7',
    category: 'beverages',
    tags: ['beverage', 'cola', 'refreshing'],
    inStock: true,
    description: 'Classic Coca Cola for instant refreshment.',
    rating: 4.2,
    reviewCount: 567,
    discountPercentage: 13,
    nutritionFacts: { calories: 140, protein: 0, carbs: 39, fats: 0, fiber: 0, sugar: 39, sodium: 45 },
    highlights: ['Classic refreshing taste', 'Perfect with meals', 'Ice cold serving recommended']
  }
];

export const enhancedCategories = [
  { id: 'all', name: 'All Categories', icon: '🛒' },
  { id: 'top-picks', name: 'Top Picks', icon: '⭐' },
  { id: 'monsoon', name: 'Monsoon Essentials', icon: '☂️' },
  { id: 'fresh', name: 'Fresh Vegetables', icon: '🥬' },
  { id: 'dairy', name: 'Dairy, Bread & Eggs', icon: '🥛' },
  { id: 'fruits', name: 'Fresh Fruits', icon: '🍎' },
  { id: 'oils', name: 'Oils, Ghee & Masala', icon: '🛢️' },
  { id: 'rice', name: 'Rice, Atta & Dal', icon: '🌾' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' },
];

export const enhancedFilters = [
  { id: 'organic', name: 'Organic', icon: '🌱' },
  { id: 'fresh', name: 'Fresh', icon: '🆕' },
  { id: 'premium', name: 'Premium', icon: '⭐' },
  { id: 'discount', name: 'On Sale', icon: '🏷️' },
  { id: 'high-protein', name: 'High Protein', icon: '💪' },
  { id: 'low-fat', name: 'Low Fat', icon: '🔥' },
  { id: 'vitamin-rich', name: 'Vitamin Rich', icon: '🍊' },
  { id: 'fiber-rich', name: 'High Fiber', icon: '🌾' },
];
