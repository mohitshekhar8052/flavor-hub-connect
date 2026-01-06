// Order Status
export const ORDER_STATUS = {
  PLACED: 'placed',
  CONFIRMED: 'confirmed',
  PREPARING: 'preparing',
  OUT_FOR_DELIVERY: 'out_for_delivery',
  DELIVERED: 'delivered',
  CANCELLED: 'cancelled',
} as const;

// Payment Status
export const PAYMENT_STATUS = {
  PENDING: 'pending',
  PAID: 'paid',
  FAILED: 'failed',
} as const;

// User Roles
export const USER_ROLES = {
  CUSTOMER: 'customer',
  RESTAURANT: 'restaurant',
  ADMIN: 'admin',
} as const;

// Cart Settings
export const CART_EXPIRY_HOURS = 24;
export const CART_STORAGE_KEY = 'foodie-cart';

// Pricing
export const DEFAULT_DELIVERY_FEE = 40;
export const TAX_RATE = 0.08; // 8% GST

// Validation
export const MIN_PASSWORD_LENGTH = 6;
export const PINCODE_LENGTH = 6;
export const PHONE_NUMBER_LENGTH = 10;

// Time Settings
export const DEFAULT_DELIVERY_TIME_MINUTES = 45;

// Pagination
export const DEFAULT_PAGE_SIZE = 10;
export const FEATURED_RESTAURANTS_LIMIT = 6;

export type OrderStatus = typeof ORDER_STATUS[keyof typeof ORDER_STATUS];
export type PaymentStatus = typeof PAYMENT_STATUS[keyof typeof PAYMENT_STATUS];
export type UserRole = typeof USER_ROLES[keyof typeof USER_ROLES];
