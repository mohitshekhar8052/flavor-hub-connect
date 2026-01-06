# Firebase Setup Guide

This project uses Firebase for authentication and database. Follow these steps to set up Firebase:

## 1. Create a Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click "Add Project" and follow the setup wizard
3. Give your project a name (e.g., "Flavor Hub Connect")

## 2. Enable Authentication

1. In your Firebase project, go to **Authentication** in the left sidebar
2. Click "Get Started"
3. Enable the following sign-in methods:
   - **Email/Password**: Click on it and enable it
   - **Google**: Click on it, enable it, and add your support email

## 3. Create Firestore Database

1. In your Firebase project, go to **Firestore Database** in the left sidebar
2. Click "Create Database"
3. Choose **Start in test mode** (for development)
4. Select a Cloud Firestore location close to your users

## 4. Set up Firestore Security Rules

Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Restaurants collection - public read, authenticated write
    match /restaurants/{restaurantId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Menu items collection - public read, authenticated write
    match /menuItems/{menuItemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // Orders collection - users can only read/write their own orders
    match /orders/{orderId} {
      allow read: if request.auth != null && request.auth.uid == resource.data.userId;
      allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
      allow update: if request.auth != null && request.auth.uid == resource.data.userId;
    }
  }
}
```

## 5. Get Firebase Configuration

1. In Firebase Console, go to **Project Settings** (gear icon)
2. Scroll down to "Your apps" section
3. Click on the Web icon `</>`
4. Register your app with a nickname
5. Copy the `firebaseConfig` object

## 6. Configure Environment Variables

1. Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

2. Fill in your Firebase configuration in the `.env` file:

```env
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
```

## 7. Initialize Sample Data (Optional)

You can add sample restaurant data manually through the Firebase Console or create a script to seed data.

### Example Restaurant Document Structure:

```json
{
  "name": "Pizza Palace",
  "image": "https://example.com/pizza-palace.jpg",
  "cuisine": ["Italian", "Pizza"],
  "rating": 4.5,
  "reviewCount": 120,
  "deliveryTime": "30-40 min",
  "deliveryFee": 2.99,
  "minOrder": 10,
  "isOpen": true,
  "distance": "1.2 km",
  "featured": true
}
```

### Example Menu Item Document Structure:

```json
{
  "restaurantId": "restaurant_id_here",
  "name": "Margherita Pizza",
  "description": "Classic pizza with tomato sauce and mozzarella",
  "price": 12.99,
  "image": "https://example.com/margherita.jpg",
  "category": "Pizza",
  "isVeg": true,
  "isPopular": true
}
```

## 8. Run the Application

```bash
npm run dev
```

## Available Firebase Hooks

The project includes custom hooks for Firebase operations:

### Authentication
- `useAuth()` - Get current user and auth methods

### Restaurants
- `useRestaurants()` - Get all restaurants
- `useRestaurant(id)` - Get single restaurant
- `useFeaturedRestaurants()` - Get featured restaurants
- `useRestaurantsByCategory(category)` - Get restaurants by category

### Menu Items
- `useMenuItems(restaurantId)` - Get menu items for a restaurant
- `useMenuItem(id)` - Get single menu item

### Orders
- `useUserOrders(userId)` - Get user's orders
- `useCreateOrder()` - Create new order
- `useUpdateOrderStatus()` - Update order status

## Troubleshooting

### CORS Issues
If you encounter CORS issues, make sure:
1. Your domain is authorized in Firebase Console
2. Authentication is properly configured

### Security Rules Errors
If you get permission denied errors:
1. Check that security rules are properly set
2. Make sure the user is authenticated for protected operations

### Environment Variables Not Loading
Make sure:
1. `.env` file is in the project root
2. All variables start with `VITE_`
3. Restart the development server after changing `.env`

## Production Deployment

Before deploying to production:

1. **Update Firestore Security Rules** to production-ready rules
2. **Add authorized domains** in Firebase Authentication settings
3. **Review Firebase usage limits** and upgrade plan if needed
4. **Set up environment variables** in your hosting platform
5. **Enable Firebase Analytics** (optional)

## Additional Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firestore Data Modeling](https://firebase.google.com/docs/firestore/manage-data/structure-data)
- [Firebase Authentication Docs](https://firebase.google.com/docs/auth)
