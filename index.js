import express from 'express';
import cors from 'cors';
import axios from 'axios';

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const PLACE_ID = '119970025188147'; // Replace this with your actual PLACE ID, not universe ID

const ROBLOX_VOTE_API_URL = `https://games.roblox.com/v1/games/votes?placeId=${PLACE_ID}`;

/**
 * Fetch like count (thumbs up) from Roblox API for the given place ID.
 */
async function fetchLikeCount() {
  try {
    const { data } = await axios.get(ROBLOX_VOTE_API_URL);

    if (!data || typeof data.upVotes !== 'number') {
      throw new Error('Invalid vote data from Roblox API');
    }

    return data.upVotes;
  } catch (error) {
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
