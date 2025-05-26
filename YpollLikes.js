const axios = require('axios');
//
const UNIVERSE_ID = '7728250854'; // Replace with your universe ID
const POLL_INTERVAL_MS = 60 * 1000; // 60 seconds

async function fetchLikes() {
    try {
        const url = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;
        const response = await axios.get(url);

        const gameData = response.data?.data?.[0];
        const thumbsUpCount = gameData?.thumbsUpCount;
        const favoritedCount = gameData?.favoritedCount;

        console.log(`[${new Date().toLocaleTimeString()}] thumbsUpCount: ${thumbsUpCount ?? 'N/A'}, favoritedCount: ${favoritedCount ?? 'N/A'}`);
    } catch (error) {
        console.error('Error fetching likes:', error.message);
    }
}

console.log(`Starting to poll Roblox API every ${POLL_INTERVAL_MS / 1000} seconds...`);
fetchLikes();
setInterval(fetchLikes, POLL_INTERVAL_MS);
