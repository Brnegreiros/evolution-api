// Vercel serverless function entry point for ES Modules
import express from 'express';

// Create Express app
const app = express();

// Set up basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set CORS headers
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  next();
});

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Evolution API is running',
    version: '2.3.6',
    platform: 'Vercel',
    timestamp: new Date().toISOString()
  });
});

// Import and mount Evolution API routes
let routerLoaded = false;
app.use('*', async (req, res, next) => {
  if (!routerLoaded) {
    try {
      // Dynamic import for ES modules
      const { router } = await import('../dist/api/routes/index.router.js');
      app.use('/', router);
      routerLoaded = true;
      // Process the current request
      router(req, res, next);
    } catch (error) {
      console.error('Failed to load Evolution API routes:', error);
      res.status(500).json({ 
        error: 'Evolution API not loaded',
        details: error.message 
      });
    }
  } else {
    next();
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Application error:', err);
  res.status(500).json({ 
    error: 'Internal Server Error', 
    details: err.message 
  });
});

// Vercel serverless function handler
export default app;
