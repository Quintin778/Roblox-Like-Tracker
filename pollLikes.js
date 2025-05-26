const axios = require('axios');

// ✅ Use Universe ID instead of Place ID
const UNIVERSE_ID = '7728250854'; // <-- Replace with your actual universe ID
const POLL_INTERVAL_MS = 60 * 1000; // 60 seconds

async function fetchLikes() {
  try {
    const url = `https://games.roblox.com/v1/games/votes?universeIds=${UNIVERSE_ID}`;
    const response = await axios.get(url);

    const voteData = response.data.data?.[0]; // API returns an array

    if (!voteData) {
      throw new Error('Vote data not found');
    }

    const { upVotes, downVotes } = voteData;

    console.log(`[${new Date().toLocaleTimeString()}] 👍 Likes: ${upVotes} | 👎 Dislikes: ${downVotes}`);
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Error fetching likes:`, error.message);
  }
}

console.log(`Starting to poll Roblox API every ${POLL_INTERVAL_MS / 1000} seconds...`);
fetchLikes();
setInterval(fetchLikes, POLL_INTERVAL_MS);
