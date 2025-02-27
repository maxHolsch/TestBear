const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const cors = require('cors');

// Load environment variables from .env file
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Import API routes
const chatRoutes = require('./server/api/chat');

// Mount API routes
app.use('/api', chatRoutes);

// Serve static files if in production
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'build')));
  
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
  });
}

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log(`API key configured: ${process.env.ANTHROPIC_API_KEY ? 'Yes' : 'No'}`);
}); 