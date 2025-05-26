const axios = require('axios');

const UNIVERSE_ID = '7728250854'; // Replace with your universe ID
const POLL_INTERVAL_MS = 60 * 1000; // 60 seconds

async function fetchLikes() {
  try {
    const url = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;
    const response = await axios.get(url);

    const gameData = response.data?.data?.[0];
    if (!gameData) {
      console.warn(`[${new Date().toLocaleTimeString()}] No game data received`);
      return;
    }

    const thumbsUpCount = typeof gameData.thumbsUpCount === 'number' ? gameData.thumbsUpCount : 'N/A';
    const favoritedCount = typeof gameData.favoritedCount === 'number' ? gameData.favoritedCount : 'N/A';

    console.log(`[${new Date().toLocaleTimeString()}] thumbsUpCount: ${thumbsUpCount}, favoritedCount: ${favoritedCount}`);
  } catch (error) {
    console.error(`[${new Date().toLocaleTimeString()}] Error fetching likes:`, error.message);
  }
}

console.log(`Starting to poll Roblox API every ${POLL_INTERVAL_MS / 1000} seconds...`);
fetchLikes();
setInterval(fetchLikes, POLL_INTERVAL_MS);
