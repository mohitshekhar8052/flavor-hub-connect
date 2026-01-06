import { Restaurant, MenuItem } from '@/types';

export const restaurants: Restaurant[] = [
  {
    id: '1',
    name: 'The Spice Garden',
    image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=800&q=80',
    cuisine: ['Indian', 'North Indian', 'Mughlai'],
    rating: 4.5,
    reviewCount: 2340,
    deliveryTime: '25-35 min',
    deliveryFee: 40,
    minOrder: 150,
    isOpen: true,
    distance: '1.2 km',
    featured: true,
  },
  {
    id: '2',
    name: 'Burger Barn',
    image: 'https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=800&q=80',
    cuisine: ['American', 'Burgers', 'Fast Food'],
    rating: 4.3,
    reviewCount: 1856,
    deliveryTime: '15-25 min',
    deliveryFee: 30,
    minOrder: 100,
    isOpen: true,
    distance: '0.8 km',
    featured: true,
  },
  {
    id: '3',
    name: 'Sushi Master',
    image: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=800&q=80',
    cuisine: ['Japanese', 'Sushi', 'Asian'],
    rating: 4.7,
    reviewCount: 3201,
    deliveryTime: '30-40 min',
    deliveryFee: 50,
    minOrder: 250,
    isOpen: true,
    distance: '2.1 km',
  },
  {
    id: '4',
    name: 'Pizza Paradise',
    image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?w=800&q=80',
    cuisine: ['Italian', 'Pizza', 'Pasta'],
    rating: 4.4,
    reviewCount: 4521,
    deliveryTime: '20-30 min',
    deliveryFee: 35,
    minOrder: 120,
    isOpen: true,
    distance: '1.5 km',
    featured: true,
  },
  {
    id: '5',
    name: 'Thai Orchid',
    image: 'https://images.unsplash.com/photo-1559314809-0d155014e29e?w=800&q=80',
    cuisine: ['Thai', 'Asian', 'Curry'],
    rating: 4.6,
    reviewCount: 1923,
    deliveryTime: '25-35 min',
    deliveryFee: 40,
    minOrder: 180,
    isOpen: true,
    distance: '1.8 km',
  },
  {
    id: '6',
    name: 'Mediterranean Delights',
    image: 'https://images.unsplash.com/photo-1544025162-d76694265947?w=800&q=80',
    cuisine: ['Mediterranean', 'Greek', 'Healthy'],
    rating: 4.5,
    reviewCount: 1567,
    deliveryTime: '30-40 min',
    deliveryFee: 40,
    minOrder: 200,
    isOpen: false,
    distance: '2.5 km',
  },
];

export const menuItems: MenuItem[] = [
  // The Spice Garden (id: 1)
  {
    id: 'm1',
    restaurantId: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken in creamy tomato-based curry with aromatic spices',
    price: 320,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?w=400&q=80',
    category: 'Main Course',
    isVeg: false,
    isBestSeller: true,
  },
  {
    id: 'm2',
    restaurantId: '1',
    name: 'Paneer Tikka Masala',
    description: 'Grilled cottage cheese cubes in rich, spiced gravy',
    price: 280,
    image: 'https://images.unsplash.com/photo-1631452180519-c014fe946bc7?w=400&q=80',
    category: 'Main Course',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'm3',
    restaurantId: '1',
    name: 'Garlic Naan',
    description: 'Freshly baked flatbread with garlic and butter',
    price: 60,
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=400&q=80',
    category: 'Breads',
    isVeg: true,
  },
  {
    id: 'm4',
    restaurantId: '1',
    name: 'Biryani',
    description: 'Fragrant basmati rice with tender meat and aromatic spices',
    price: 380,
    image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=400&q=80',
    category: 'Rice',
    isVeg: false,
    isBestSeller: true,
  },
  // Burger Barn (id: 2)
  {
    id: 'm5',
    restaurantId: '2',
    name: 'Classic Smash Burger',
    description: 'Double patty with American cheese, lettuce, tomato, and special sauce',
    price: 250,
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&q=80',
    category: 'Burgers',
    isVeg: false,
    isBestSeller: true,
  },
  {
    id: 'm6',
    restaurantId: '2',
    name: 'Crispy Chicken Burger',
    description: 'Crispy fried chicken with coleslaw and mayo',
    price: 220,
    image: 'https://images.unsplash.com/photo-1606755962773-d324e0a13086?w=400&q=80',
    category: 'Burgers',
    isVeg: false,
    isPopular: true,
  },
  {
    id: 'm7',
    restaurantId: '2',
    name: 'Loaded Fries',
    description: 'Crispy fries topped with cheese, bacon, and jalapeños',
    price: 150,
    image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=400&q=80',
    category: 'Sides',
    isVeg: false,
  },
  // Pizza Paradise (id: 4)
  {
    id: 'm8',
    restaurantId: '4',
    name: 'Margherita Pizza',
    description: 'Fresh mozzarella, tomato sauce, and basil on thin crust',
    price: 280,
    image: 'https://images.unsplash.com/photo-1574071318508-1cdbab80d002?w=400&q=80',
    category: 'Pizza',
    isVeg: true,
    isPopular: true,
  },
  {
    id: 'm9',
    restaurantId: '4',
    name: 'Pepperoni Supreme',
    description: 'Loaded with pepperoni, mozzarella, and Italian herbs',
    price: 350,
    image: 'https://images.unsplash.com/photo-1628840042765-356cda07504e?w=400&q=80',
    category: 'Pizza',
    isVeg: false,
    isBestSeller: true,
  },
  {
    id: 'm10',
    restaurantId: '4',
    name: 'Garlic Breadsticks',
    description: 'Warm breadsticks with garlic butter and parmesan',
    price: 120,
    image: 'https://images.unsplash.com/photo-1619535860434-ba1d8fa12536?w=400&q=80',
    category: 'Sides',
    isVeg: true,
  },
];

export const getRestaurantById = (id: string): Restaurant | undefined => {
  return restaurants.find(r => r.id === id);
};

export const getMenuByRestaurantId = (restaurantId: string): MenuItem[] => {
  return menuItems.filter(m => m.restaurantId === restaurantId);
};

export const getFeaturedRestaurants = (): Restaurant[] => {
  return restaurants.filter(r => r.featured);
};

export const getCategories = (): string[] => {
  return ['All', 'Indian', 'American', 'Italian', 'Japanese', 'Thai', 'Chinese', 'Mexican', 'Healthy'];
};
