const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());

// Replace with your game's root place ID
const ROOT_PLACE_ID = '119970025188147';

app.get('/likes', async (req, res) => {
    try {
        const url = `https://games.roblox.com/v1/places/${ROOT_PLACE_ID}`;
        const response = await axios.get(url);

        console.log("Place API response data:", response.data);

        const likes = response.data.thumbsUpCount || 0;
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
