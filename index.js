const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

const PORT = process.env.PORT || 3000;
const PLACE_ID = '119970025188147'; // <-- your actual place ID
const VOTE_API_URL = `https://games.roblox.com/v1/games/votes?placeId=${PLACE_ID}`;

async function fetchLikeCount() {
  try {
    const response = await axios.get(VOTE_API_URL);
    const { upVotes } = response.data;
    return upVotes;
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
