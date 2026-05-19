# Vercel Deployment Guide

This guide explains how to deploy both the **Frontend** and **Backend** of the Ebook Creator project to Vercel using a single GitHub repository.

## Prerequisites
- A [Vercel](https://vercel.com/) account.
- Your project pushed to a [GitHub](https://github.com/) repository.

---

## Step 1: Deploy the Backend

Since the project uses a monorepo-style structure, we will create two separate projects on Vercel linked to the same repository.

1. Go to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** > **"Project"**.
2. Import your GitHub repository.
3. **Configure the Backend Project:**
   - **Project Name:** `ebook-creator-backend` (or your choice).
   - **Framework Preset:** Other (it should auto-detect Node.js).
   - **Root Directory:** Click "Edit" and select the `backend` folder.
4. **Environment Variables:**
   Add the following variables in the "Environment Variables" section:
   - `MONGO_URI`: Your MongoDB connection string.
   - `JWT_SECRET`: A secret string for authentication.
   - `GEMINI_API_KEY`: Your Google Gemini API key.
   - `PORT`: 5000 (Optional, Vercel handles this, but good to have).
5. Click **Deploy**.
6. **Note the Backend URL:** Once deployed, Vercel will give you a URL (e.g., `https://ebook-creator-backend.vercel.app`). **Copy this URL** as you'll need it for the frontend.

---

## Step 2: Deploy the Frontend

1. Go back to your [Vercel Dashboard](https://vercel.com/dashboard) and click **"Add New..."** > **"Project"**.
2. Import the **same** GitHub repository again.
3. **Configure the Frontend Project:**
   - **Project Name:** `ebook-creator-frontend` (or your choice).
   - **Framework Preset:** **Vite**.
   - **Root Directory:** Click "Edit" and select the `frontend/ebookcreator` folder.
   - **Build Command:** `npm run build` (Default).
   - **Output Directory:** `dist` (Default).
   - **Install Command:** `npm install` (Default).
4. **Environment Variables:**
   Add the following variable:
   - `VITE_API_BASE_URL`: Paste the **Backend URL** you copied from Step 1 (e.g., `https://ebook-creator-backend.vercel.app`).
5. Click **Deploy**.

---

## Step 3: Verify the Connection

1. Open your Frontend URL.
2. Try to Sign Up or Log In.
3. Check the browser console and network tab to ensure requests are going to your Vercel backend URL.

---

## Important Notes

### CORS Configuration
The backend is already configured to allow requests from any origin (`origin: "*"`). If you want to be more secure, update `backend/server.js` to only allow your frontend URL:

```javascript
app.use(
    cors({
      origin: "https://your-frontend-url.vercel.app",
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
);
```

### Backend Configuration (`vercel.json`)
The `backend/vercel.json` file is already set up to route all requests to `server.js` and use the `@vercel/node` runtime. Do not delete this file.

### Static Files
The backend uses `express.static` for the `uploads` folder. Note that Vercel is serverless, so any files uploaded to `uploads/` will be temporary and will disappear when the function restarts. For production, consider using a cloud storage service like **AWS S3** or **Cloudinary**.
