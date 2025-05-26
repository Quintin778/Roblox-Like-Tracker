const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;

// ✅ Use Universe ID, not Place ID
const UNIVERSE_ID = '7728250854'; // <-- Replace with your actual Universe ID
const VOTE_API_URL = `https://games.roblox.com/v1/games/votes?universeIds=${UNIVERSE_ID}`;

async function fetchLikeCount() {
  try {
    const response = await axios.get(VOTE_API_URL);

    const voteData = response.data.data?.[0]; // Get the first entry in the data array
    if (!voteData || typeof voteData.upVotes !== 'number') {
      throw new Error('Invalid response from Roblox API');
    }

    return voteData.upVotes;
  } catch (error) {
    console.error('Error fetching like count:', error.message);
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
