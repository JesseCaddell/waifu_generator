import express from 'express';
import fetch from 'node-fetch';
const app = express();
const PORT = 3000;

// server static files from public directory
app.use(express.static('public'));

// API endpoint  that fetches data
app.get('/waifus', async (req, res) => {
    try {
        const apiUrl = 'https://api.waifu.im/search';
        const params = {
            included_tags: 'waifu',
            height: '>=2000'
        };

        const queryParams = new URLSearchParams(params);
        const requestUrl = `${apiUrl}?${queryParams}`;

        const response = await fetch(requestUrl)
        if (!response.ok) {
            throw new Error(`API call failed with status ${response.status}`);
        }
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500).send('Server error when fetching data');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
})