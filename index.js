import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const UNIVERSE_ID = '7728250854';
const ROBLOX_API_URL = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;

/**
 * Fetch like count from Roblox API for the given universe ID.
 * Returns thumbsUpCount if available, otherwise favoritedCount or zero.
 */
async function fetchLikeCount() {
  try {
    const { data } = await axios.get(ROBLOX_API_URL);

    if (!data || !Array.isArray(data.data) || data.data.length === 0) {
      throw new Error('No game data found in Roblox API response');
    }

    const gameInfo = data.data[0];

    // Return thumbsUpCount if number, else favoritedCount, else 0
    if (typeof gameInfo.thumbsUpCount === 'number') {
      return gameInfo.thumbsUpCount;
    }
    if (typeof gameInfo.favoritedCount === 'number') {
      return gameInfo.favoritedCount;
    }
    return 0;
  } catch (error) {
    // Log detailed error for debugging
    console.error('Error fetching like count:', error.message || error);
    throw error;
  }
}

app.get('/likes', async (req, res) => {
  try {
    const likes = await fetchLikeCount();
    res.json({ likes });
  } catch {
    res.status(500).json({ error: 'Failed to fetch like count from Roblox API' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
