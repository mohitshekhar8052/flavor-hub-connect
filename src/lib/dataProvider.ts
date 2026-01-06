import { Restaurant, MenuItem } from '@/types';
import { restaurantsService, menuItemsService } from '@/lib/firebaseService';
import {
  restaurants as staticRestaurants,
  menuItems as staticMenuItems,
  getRestaurantById as getStaticRestaurantById,
  getMenuByRestaurantId as getStaticMenuByRestaurantId,
  getFeaturedRestaurants as getStaticFeaturedRestaurants,
} from '@/data/restaurants';

// Determine data source based on environment or feature flag
const USE_FIREBASE = import.meta.env.VITE_USE_FIREBASE === 'true';

export const dataProvider = {
  // Get all restaurants
  getAllRestaurants: async (): Promise<Restaurant[]> => {
    if (USE_FIREBASE) {
      return await restaurantsService.getAll();
    }
    return Promise.resolve(staticRestaurants);
  },

  // Get restaurant by ID
  getRestaurantById: async (id: string): Promise<Restaurant | null> => {
    if (USE_FIREBASE) {
      return await restaurantsService.getById(id);
    }
    return Promise.resolve(getStaticRestaurantById(id) || null);
  },

  // Get featured restaurants
  getFeaturedRestaurants: async (limitCount?: number): Promise<Restaurant[]> => {
    if (USE_FIREBASE) {
      return await restaurantsService.getFeatured(limitCount);
    }
    const featured = getStaticFeaturedRestaurants();
    return Promise.resolve(limitCount ? featured.slice(0, limitCount) : featured);
  },

  // Get restaurants by category
  getRestaurantsByCategory: async (category: string): Promise<Restaurant[]> => {
    if (USE_FIREBASE) {
      return await restaurantsService.getByCategory(category);
    }
    const filtered = staticRestaurants.filter((r) =>
      r.cuisine.some((c) => c.toLowerCase().includes(category.toLowerCase()))
    );
    return Promise.resolve(filtered);
  },

  // Get menu items by restaurant ID
  getMenuByRestaurantId: async (restaurantId: string): Promise<MenuItem[]> => {
    if (USE_FIREBASE) {
      return await menuItemsService.getByRestaurant(restaurantId);
    }
    return Promise.resolve(getStaticMenuByRestaurantId(restaurantId));
  },

  // Get menu item by ID
  getMenuItemById: async (id: string): Promise<MenuItem | null> => {
    if (USE_FIREBASE) {
      return await menuItemsService.getById(id);
    }
    const item = staticMenuItems.find((m) => m.id === id);
    return Promise.resolve(item || null);
  },
};
