const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const UNIVERSE_ID = '7728250854';

app.get('/likes', async (req, res) => {
  try {
    const url = `https://games.roblox.com/v1/universes/${UNIVERSE_ID}/configuration`;
    const response = await axios.get(url);

    console.log("Response data:", response.data);

    // Safely get favoritedCount or 0 if missing
    const likes = response.data.favoritedCount ?? 0;

    res.json({ likes });
  } catch (error) {
    console.error("Error fetching likes:", error.response?.status, error.message);
    res.status(500).json({ error: 'Failed to fetch like count' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
