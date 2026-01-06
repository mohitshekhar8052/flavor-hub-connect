import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { restaurantsService, menuItemsService, ordersService } from '@/lib/firebaseService';
import { Restaurant, MenuItem, Order } from '@/types';

// Restaurant hooks
export const useRestaurants = () => {
  return useQuery({
    queryKey: ['restaurants'],
    queryFn: restaurantsService.getAll,
  });
};

export const useRestaurant = (id: string) => {
  return useQuery({
    queryKey: ['restaurant', id],
    queryFn: () => restaurantsService.getById(id),
    enabled: !!id,
  });
};

export const useFeaturedRestaurants = (limit?: number) => {
  return useQuery({
    queryKey: ['restaurants', 'featured', limit],
    queryFn: () => restaurantsService.getFeatured(limit),
  });
};

export const useRestaurantsByCategory = (category: string) => {
  return useQuery({
    queryKey: ['restaurants', 'category', category],
    queryFn: () => restaurantsService.getByCategory(category),
    enabled: !!category,
  });
};

// Menu items hooks
export const useMenuItems = (restaurantId: string) => {
  return useQuery({
    queryKey: ['menuItems', restaurantId],
    queryFn: () => menuItemsService.getByRestaurant(restaurantId),
    enabled: !!restaurantId,
  });
};

export const useMenuItem = (id: string) => {
  return useQuery({
    queryKey: ['menuItem', id],
    queryFn: () => menuItemsService.getById(id),
    enabled: !!id,
  });
};

// Orders hooks
export const useUserOrders = (userId: string) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: () => ordersService.getByUser(userId),
    enabled: !!userId,
  });
};

export const useOrder = (id: string) => {
  return useQuery({
    queryKey: ['order', id],
    queryFn: () => ordersService.getById(id),
    enabled: !!id,
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ordersService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      ordersService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['orders'] });
    },
  });
};

// Restaurant mutations
export const useAddRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restaurantsService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};

export const useUpdateRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Restaurant> }) =>
      restaurantsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};

export const useDeleteRestaurant = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: restaurantsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['restaurants'] });
    },
  });
};

// Menu item mutations
export const useAddMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuItemsService.add,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useUpdateMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<MenuItem> }) =>
      menuItemsService.update(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};

export const useDeleteMenuItem = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: menuItemsService.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['menuItems'] });
    },
  });
};
