const express = require('express');
const cors = require('cors');
const axios = require('axios');
// d
const app = express();
app.use(cors());

const UNIVERSE_ID = '7728250854'; // Replace with your universeId

app.get('/likes', async (req, res) => {
    try {
        const url = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;
        const response = await axios.get(url);

        console.log("Roblox API response data:", response.data);

        const gameData = response.data?.data?.[0];

        // Try thumbsUpCount, else favoritedCount, else 0
        const likes = gameData?.thumbsUpCount ?? gameData?.favoritedCount ?? 0;

        res.json({ likes });
    } catch (error) {
        console.error("Error fetching like count:", error);
        res.status(500).json({ error: 'Failed to fetch like count' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
