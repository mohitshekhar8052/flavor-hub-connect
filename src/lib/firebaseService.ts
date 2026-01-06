import {
  collection,
  doc,
  getDoc,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  limit,
  Timestamp,
} from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Restaurant, MenuItem, Order } from '@/types';

// Collections
const RESTAURANTS_COLLECTION = 'restaurants';
const MENU_ITEMS_COLLECTION = 'menuItems';
const ORDERS_COLLECTION = 'orders';

// Restaurant CRUD operations
export const restaurantsService = {
  // Get all restaurants
  getAll: async (): Promise<Restaurant[]> => {
    const q = query(collection(db, RESTAURANTS_COLLECTION));
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
  },

  // Get restaurant by ID
  getById: async (id: string): Promise<Restaurant | null> => {
    const docRef = doc(db, RESTAURANTS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as Restaurant : null;
  },

  // Get restaurants by category
  getByCategory: async (category: string): Promise<Restaurant[]> => {
    const q = query(
      collection(db, RESTAURANTS_COLLECTION),
      where('categories', 'array-contains', category)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
  },

  // Get featured restaurants
  getFeatured: async (limitCount: number = 6): Promise<Restaurant[]> => {
    const q = query(
      collection(db, RESTAURANTS_COLLECTION),
      where('featured', '==', true),
      limit(limitCount)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Restaurant));
  },

  // Add new restaurant
  add: async (restaurant: Omit<Restaurant, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, RESTAURANTS_COLLECTION), restaurant);
    return docRef.id;
  },

  // Update restaurant
  update: async (id: string, data: Partial<Restaurant>): Promise<void> => {
    const docRef = doc(db, RESTAURANTS_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  // Delete restaurant
  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, RESTAURANTS_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

// Menu Items CRUD operations
export const menuItemsService = {
  // Get all menu items for a restaurant
  getByRestaurant: async (restaurantId: string): Promise<MenuItem[]> => {
    const q = query(
      collection(db, MENU_ITEMS_COLLECTION),
      where('restaurantId', '==', restaurantId)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as MenuItem));
  },

  // Get menu item by ID
  getById: async (id: string): Promise<MenuItem | null> => {
    const docRef = doc(db, MENU_ITEMS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } as MenuItem : null;
  },

  // Add new menu item
  add: async (menuItem: Omit<MenuItem, 'id'>): Promise<string> => {
    const docRef = await addDoc(collection(db, MENU_ITEMS_COLLECTION), menuItem);
    return docRef.id;
  },

  // Update menu item
  update: async (id: string, data: Partial<MenuItem>): Promise<void> => {
    const docRef = doc(db, MENU_ITEMS_COLLECTION, id);
    await updateDoc(docRef, data);
  },

  // Delete menu item
  delete: async (id: string): Promise<void> => {
    const docRef = doc(db, MENU_ITEMS_COLLECTION, id);
    await deleteDoc(docRef);
  },
};

// Orders CRUD operations
export const ordersService = {
  // Create new order
  create: async (order: Omit<Order, 'id' | 'createdAt'>): Promise<string> => {
    const orderData = {
      ...order,
      createdAt: Timestamp.now(),
    };
    const docRef = await addDoc(collection(db, ORDERS_COLLECTION), orderData);
    return docRef.id;
  },

  // Get orders by user ID
  getByUser: async (userId: string): Promise<Order[]> => {
    const q = query(
      collection(db, ORDERS_COLLECTION),
      where('userId', '==', userId),
      orderBy('createdAt', 'desc')
    );
    const snapshot = await getDocs(q);
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate(),
    } as Order));
  },

  // Get order by ID
  getById: async (id: string): Promise<Order | null> => {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    const docSnap = await getDoc(docRef);
    if (!docSnap.exists()) return null;
    
    const data = docSnap.data();
    return {
      id: docSnap.id,
      ...data,
      createdAt: data.createdAt?.toDate(),
    } as Order;
  },

  // Update order status
  updateStatus: async (id: string, status: string): Promise<void> => {
    const docRef = doc(db, ORDERS_COLLECTION, id);
    await updateDoc(docRef, { status });
  },
};
