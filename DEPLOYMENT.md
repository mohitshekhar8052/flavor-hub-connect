# Vercel Deployment Guide

## Prerequisites
- GitHub account
- Vercel account (sign up at https://vercel.com)
- Firebase project with configuration

## Deployment Steps

### 1. Push Your Code to GitHub
If you haven't already:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin <your-github-repo-url>
git push -u origin main
```

### 2. Deploy to Vercel

#### Option A: Using Vercel CLI (Recommended for first deployment)
```bash
# Install Vercel CLI globally
npm install -g vercel

# Login to Vercel
vercel login

# Deploy (follow the prompts)
vercel

# For production deployment
vercel --prod
```

#### Option B: Using Vercel Dashboard
1. Go to https://vercel.com/new
2. Import your GitHub repository
3. Vercel will auto-detect Vite configuration
4. Configure environment variables (see below)
5. Click "Deploy"

### 3. Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

```
VITE_FIREBASE_API_KEY=your_api_key_here
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain_here
VITE_FIREBASE_PROJECT_ID=your_project_id_here
VITE_FIREBASE_STORAGE_BUCKET=your_storage_bucket_here
VITE_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id_here
VITE_FIREBASE_APP_ID=your_app_id_here
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id_here
```

**Important:** Add these variables for all environments (Production, Preview, Development)

### 4. Firebase Configuration

Update your Firebase project to allow your Vercel domain:

1. Go to Firebase Console > Authentication > Settings
2. Add your Vercel domain to **Authorized domains**:
   - `your-project.vercel.app`
   - Any custom domains you add

### 5. Automatic Deployments

Once connected to GitHub:
- **Push to main branch** → Deploys to production
- **Push to other branches** → Creates preview deployments
- **Pull requests** → Automatic preview deployments

## Build Configuration

Vercel auto-detects the following from your `package.json`:
- **Build Command:** `npm run build`
- **Output Directory:** `dist`
- **Install Command:** `npm install`

These are already configured correctly in your project.

## Custom Domain (Optional)

1. Go to your Vercel project settings
2. Navigate to **Domains**
3. Add your custom domain
4. Follow DNS configuration instructions

## Troubleshooting

### Build Fails
- Check that all environment variables are set
- Ensure `package.json` dependencies are correct
- Review build logs in Vercel dashboard

### 404 on Routes
- The `vercel.json` file handles SPA routing
- All routes redirect to `index.html`

### Firebase Connection Issues
- Verify environment variables in Vercel
- Check Firebase authorized domains
- Ensure Firebase API keys are correct

## Local Preview of Production Build

Test your production build locally before deploying:
```bash
npm run build
npm run preview
```

## Useful Commands

```bash
# Deploy to preview
vercel

# Deploy to production
vercel --prod

# View deployment logs
vercel logs

# List all deployments
vercel ls

# Remove a deployment
vercel rm <deployment-url>
```

## Resources
- [Vercel Documentation](https://vercel.com/docs)
- [Vite Deployment Guide](https://vitejs.dev/guide/static-deploy.html)
- [Firebase Hosting](https://firebase.google.com/docs/hosting)
