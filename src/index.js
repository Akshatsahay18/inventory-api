const axios = require('axios');
const express = require('express');
const app = express();

// Upstream dependency: the redis cache (resolved from REDIS_URL)
const REDIS_URL = process.env.REDIS_URL;

app.get('/stock', async (req, res) => {
  // inventory-api -> redis : GET /cache (read cached stock levels)
  const cached = await axios.get(`${REDIS_URL}/cache`);
  res.json({ stock: cached.data });
});

app.listen(3000, () => console.log('inventory-api on :3000'));
