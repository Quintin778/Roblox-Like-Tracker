const axios = require('axios');

const PLACE_ID = '119970025188147'; // Replace with your actual PLACE ID
const POLL_INTERVAL_MS = 60 * 1000; // 60 seconds

async function fetchLikes() {
  try {
    const url = `https://games.roblox.com/v1/games/votes?placeId=${PLACE_ID}`;
    const response = await axios.get(url);

    const { upVotes, downVotes } = response.data;

    console.log(`[${new Date().toLocaleTimeString()}] 👍 Likes: ${upVotes} | 👎 Dislikes: ${downVotes}`);
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Error fetching likes:`, error.message);
  }
}

console.log(`Starting to poll Roblox API every ${POLL_INTERVAL_MS / 1000} seconds...`);
fetchLikes();
setInterval(fetchLikes, POLL_INTERVAL_MS);
