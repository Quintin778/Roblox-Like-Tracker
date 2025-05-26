const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// Use your game's universe ID here (not the rootPlaceId)
const UNIVERSE_ID = '7728250854';

app.get('/likes', async (req, res) => {
    try {
        const url = `https://games.roblox.com/v1/games?universeIds=${UNIVERSE_ID}`;
        const response = await axios.get(url);

        console.log("Games API response data:", response.data);

        // Response data contains an array "data" with game info objects
        const gamesData = response.data.data;
        const likes = gamesData.length > 0 ? gamesData[0].likes || 0 : 0;

        res.json({ likes });
    } catch (error) {
        console.error("Error fetching like count:", error.message || error);
        res.status(500).json({ error: 'Failed to fetch like count' });
    }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
