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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: 'Evolution API is running',
    version: '2.3.6',
    platform: 'Vercel'
  });
});

// Basic API info endpoint
app.get('/api/info', (req, res) => {
  res.json({
    name: 'Evolution API',
    version: '2.3.6',
    description: 'Rest API for WhatsApp communication',
    platform: 'Vercel',
    status: 'running'
  });
});

// Fallback for all other routes
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Not Found',
    message: 'Evolution API routes are not available in Vercel environment',
    available_endpoints: ['/health', '/api/info'],
    note: 'This is a simplified version for Vercel deployment'
  });
});

// Vercel serverless function handler
module.exports = app;
