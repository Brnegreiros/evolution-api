// Vercel serverless function entry point
const express = require('express');

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

// Import and mount Evolution API routes
try {
  const { router } = require('../dist/api/routes/index.router');
  app.use('/', router);
} catch (error) {
  console.error('Failed to load Evolution API routes:', error);
  
  // Fallback route
  app.use('*', (req, res) => {
    res.status(500).json({ 
      error: 'Evolution API not loaded',
      details: error.message 
    });
  });
}

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'OK', message: 'Evolution API is running' });
});

// Vercel serverless function handler
module.exports = app;
