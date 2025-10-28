// Vercel serverless function entry point
const express = require('express');

// Create Express app
const app = express();

// Import the compiled Evolution API routes and middleware
let evolutionApp;
try {
  // Import the main application logic
  const { router } = require('../dist/api/routes/index.router');
  const { configService } = require('../dist/config/env.config');
  
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
  
  // Mount Evolution API routes
  app.use('/', router);
  
  evolutionApp = app;
} catch (error) {
  console.error('Failed to load Evolution API:', error);
  evolutionApp = null;
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  try {
    // Check if app is loaded
    if (!evolutionApp) {
      res.status(500).json({ error: 'Evolution API not loaded' });
      return;
    }

    // Handle the request with Evolution API
    evolutionApp(req, res);
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
