const express = require('express');
const cors = require('cors');
require('dotenv').config();

const playerRoutes = require('./src/routes/playerRoutes');
const lineupRoutes = require('./src/routes/lineupRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/players', playerRoutes);
app.use('/api/lineups', lineupRoutes);

app.get('/', (req, res) => {
  res.send(`
    <h1>Football Team Management API</h1>
    <p>API is running successfully!</p>
    <h2>Access Points:</h2>
    <ul>
      <li><strong>API Base URL:</strong> <a href="http://localhost:5000">http://localhost:5000</a></li>
      <li><strong>API Players Endpoint:</strong> <a href="http://localhost:5000/api/players">http://localhost:5000/api/players</a></li>
      <li><strong>API Lineups Endpoint:</strong> <a href="http://localhost:5000/api/lineups">http://localhost:5000/api/lineups</a></li>
      <li><strong>Frontend:</strong> <a href="http://localhost:3000">http://localhost:3000</a> (Start with: npm run client)</li>
    </ul>
    <h2>Development Commands:</h2>
    <ul>
      <li><strong>Start Backend Only:</strong> npm run server</li>
      <li><strong>Start Frontend Only:</strong> npm run client</li>
      <li><strong>Start Both:</strong> npm run dev:all</li>
    </ul>
  `);
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API Endpoint: http://localhost:${PORT}`);
  console.log(`Frontend will be available at: http://localhost:3000`);
  console.log(`To start the frontend, run: npm run client`);
  console.log(`To start both frontend and backend, run: npm run dev:all`);
});