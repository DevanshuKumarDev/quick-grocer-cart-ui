
export interface Product {
  id: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  category: string;
  weight: string;
  description: string;
  nutritionFacts: {
    calories: number;
    protein: number;
    carbs: number;
    fats: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  tags: string[];
  inStock: boolean;
}

export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Fresh Organic Bananas',
    brand: 'Organic Farms',
    price: 2.99,
    image: 'photo-1618160702438-9b02ab6515c9',
    category: 'fruits',
    weight: '1 lb',
    description: 'Sweet and ripe organic bananas, perfect for smoothies or snacking.',
    nutritionFacts: {
      calories: 89,
      protein: 1.1,
      carbs: 22.8,
      fats: 0.3,
      fiber: 2.6,
      sugar: 12.2,
      sodium: 1
    },
    tags: ['organic', 'vegan', 'gluten-free'],
    inStock: true
  },
  {
    id: '2',
    name: 'Premium Avocados',
    brand: 'Green Valley',
    price: 4.99,
    image: 'photo-1582562124811-c09040d0a901',
    category: 'fruits',
    weight: '4 count',
    description: 'Creamy, ripe avocados perfect for toast, salads, or guacamole.',
    nutritionFacts: {
      calories: 234,
      protein: 2.9,
      carbs: 12.8,
      fats: 21.4,
      fiber: 10.5,
      sugar: 0.9,
      sodium: 10
    },
    tags: ['organic', 'vegan', 'keto', 'low-carb'],
    inStock: true
  },
  {
    id: '3',
    name: 'Fresh Baby Spinach',
    brand: 'Garden Fresh',
    price: 3.49,
    image: 'photo-1535268647677-300dbf3d78d1',
    category: 'vegetables',
    weight: '5 oz',
    description: 'Tender baby spinach leaves, perfect for salads and smoothies.',
    nutritionFacts: {
      calories: 23,
      protein: 2.9,
      carbs: 3.6,
      fats: 0.4,
      fiber: 2.2,
      sugar: 0.4,
      sodium: 79
    },
    tags: ['organic', 'vegan', 'low-calorie', 'iron-rich'],
    inStock: true
  },
  {
    id: '4',
    name: 'Organic Carrots',
    brand: 'Nature\'s Best',
    price: 2.79,
    image: 'photo-1465146344425-f00d5f5c8f07',
    category: 'vegetables',
    weight: '2 lbs',
    description: 'Sweet and crunchy organic carrots, great for snacking or cooking.',
    nutritionFacts: {
      calories: 41,
      protein: 0.9,
      carbs: 9.6,
      fats: 0.2,
      fiber: 2.8,
      sugar: 4.7,
      sodium: 69
    },
    tags: ['organic', 'vegan', 'vitamin-a', 'low-calorie'],
    inStock: true
  },
  {
    id: '5',
    name: 'Almond Butter',
    brand: 'Nutty Delights',
    price: 8.99,
    image: 'photo-1472396961693-142e6e269027',
    category: 'snacks',
    weight: '16 oz',
    description: 'Creamy almond butter made from roasted almonds, no added sugar.',
    nutritionFacts: {
      calories: 614,
      protein: 22.1,
      carbs: 23.0,
      fats: 55.5,
      fiber: 12.2,
      sugar: 4.4,
      sodium: 5
    },
    tags: ['organic', 'vegan', 'protein-rich', 'no-sugar-added'],
    inStock: true
  }
];

export const categories = [
  { id: 'all', name: 'All', icon: '🛒' },
  { id: 'fruits', name: 'Fruits', icon: '🍎' },
  { id: 'vegetables', name: 'Vegetables', icon: '🥬' },
  { id: 'snacks', name: 'Snacks', icon: '🥜' },
  { id: 'beverages', name: 'Beverages', icon: '🥤' }
];

export const filters = [
  { id: 'organic', name: 'Organic' },
  { id: 'vegan', name: 'Vegan' },
  { id: 'low-calorie', name: 'Low Calorie' },
  { id: 'keto', name: 'Keto' },
  { id: 'gluten-free', name: 'Gluten Free' },
  { id: 'protein-rich', name: 'Protein Rich' }
];
