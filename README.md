# Foodie - Food Delivery Platform

A modern food delivery platform built with React, TypeScript, Firebase, and TailwindCSS.

## Features

- 🔐 **Authentication**: Email/password and Google OAuth login
- 🍕 **Restaurant Browsing**: Browse restaurants by cuisine, rating, and more
- 🛒 **Smart Cart**: 
  - Restaurant-specific cart with validation
  - Minimum order enforcement
  - Price validation at checkout
  - 24-hour cart expiry
  - Restaurant status checking
- 📦 **Order Management**: Place orders, track status, view order history
- 👤 **User Profile**: Manage personal information
- 🎨 **Modern UI**: Responsive design with shadcn/ui components
- 🔥 **Firebase Integration**: Real-time database and authentication

## Tech Stack

- **Frontend**: React 18.3.1, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui
- **Backend**: Firebase (Authentication, Firestore, Analytics)
- **State Management**: Context API, TanStack React Query
- **Routing**: React Router DOM v6
- **Form Handling**: react-hook-form + Zod validation
- **Icons**: Lucide React

## How can I edit this code?

**Use your preferred IDE**

Clone this repo and push changes to get started.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Set up environment variables
cp .env.example .env
# Edit .env and add your Firebase credentials

# Step 5: Start the development server with auto-reloading and an instant preview.
npm run dev
```

The app will be available at `http://localhost:8080`

## Firebase Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select existing one
3. Enable Authentication (Email/Password, Google)
4. Create a Firestore database
5. Deploy security rules from `firestore.rules`
6. Copy your Firebase config to `.env`
License

This project is licensed under the MIT License.env` file with:
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id

# Set to 'true' to use Firebase, 'false' for static data
VITE_USE_FIREBASE=false
```

## Project Structure

```
src/
├── components/          # Reusable UI components
├── contexts/           # React Context providers (Auth, Cart)
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and configs
├── pages/              # Route components
├── types/              # TypeScript type definitions
├── constants/          # Application constants
└── data/              # Static data
```

## Key Features

### Cart Business Logic

- Restaurant status validation before adding items
- Minimum order enforcement
- 24-hour cart expiry
- Price validation at checkout
- Single restaurant rule

### Authentication

- Email/password with Zod validation
- Google OAuth integration
- Protected routes
- Custom error handling

### Validation

All forms use Zod schemas:
- Login/Signup validation
- Checkout address validation
- Password requirements (min 6 chars)
- Email format validation
- Indian pincode (6 digits)
- Phone number (10 digits)

## Constants

Defined in `src/constants/index.ts`:
- Cart expiry: 24 hours
- Delivery fee: ₹40
- Tax rate: 8% GST
- Order/Payment statuses
- User roles

## Environment Modes

1. **Static Data Mode** (`VITE_USE_FIREBASE=false`): Uses local data, no Firebase required
2. **Firebase Mode** (`VITE_USE_FIREBASE=true`): Uses Firestore for real-time data

## Currency

All prices in Indian Rupees (₹):
- Menu items: ₹60-380
- Delivery fee: ₹30-50
- Minimum order: ₹100-250

## Building for Production

```bash
npm run build
```

Output in `dist/` directory.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production  
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS
