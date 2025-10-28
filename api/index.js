// Vercel serverless function entry point
const { createServer } = require('http');

// Import the compiled Evolution API
let app;
try {
  app = require('../dist/main');
} catch (error) {
  console.error('Failed to load Evolution API:', error);
  app = null;
}

// Vercel serverless function handler
module.exports = async (req, res) => {
  try {
    // Set CORS headers
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, apikey');
    
    // Handle preflight requests
    if (req.method === 'OPTIONS') {
      res.status(200).end();
      return;
    }

    // Check if app is loaded
    if (!app) {
      res.status(500).json({ error: 'Evolution API not loaded' });
      return;
    }

    // Handle the request with Evolution API
    await app(req, res);
  } catch (err) {
    console.error('Error occurred handling', req.url, err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};
