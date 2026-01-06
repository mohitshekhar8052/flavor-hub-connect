import { z } from 'zod';

// Login validation schema
export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long'),
});

// Signup validation schema
export const signupSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(50, 'Name is too long')
    .regex(/^[a-zA-Z\s]+$/, 'Name can only contain letters and spaces'),
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
    .max(100, 'Password is too long')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
});

// Checkout address validation schema
export const checkoutAddressSchema = z.object({
  label: z
    .string()
    .min(1, 'Address label is required')
    .max(20, 'Label is too long'),
  addressLine1: z
    .string()
    .min(5, 'Address must be at least 5 characters')
    .max(100, 'Address is too long'),
  addressLine2: z
    .string()
    .max(100, 'Address is too long')
    .optional(),
  city: z
    .string()
    .min(2, 'City name is required')
    .max(50, 'City name is too long'),
  state: z
    .string()
    .min(2, 'State name is required')
    .max(50, 'State name is too long'),
  pincode: z
    .string()
    .length(6, 'Pincode must be exactly 6 digits')
    .regex(/^\d{6}$/, 'Pincode must contain only numbers'),
});

// Password reset schema
export const passwordResetSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Please enter a valid email address'),
});

// Types inferred from schemas
export type LoginFormData = z.infer<typeof loginSchema>;
export type SignupFormData = z.infer<typeof signupSchema>;
export type CheckoutAddressFormData = z.infer<typeof checkoutAddressSchema>;
export type PasswordResetFormData = z.infer<typeof passwordResetSchema>;
