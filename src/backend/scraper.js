// server.js
const express = require('express');
const axios = require('axios');
const cheerio = require('cheerio');

const app = express();

app.get('/api/universities', async (req, res) => {
    try {
        const url = 'https://www.iba-suk.edu.pk/'; // Replace with the actual URL
        const response = await axios.get(url);
        const html = response.data;

        // Use Cheerio to parse the HTML and extract relevant data
        const $ = cheerio.load(html);
        // Extract university names, descriptions, etc.
        const universities = [];

        $('selector_for_universities').each((index, element) => {
            // Extract data for each university
            const university = {
                name: $(element).find('selector_for_name').text(),
                description: $(element).find('selector_for_description').text(),
                // Add more properties as needed
            };
            universities.push(university);
        });

        // Log the extracted data
        console.log('Extracted university data:', universities);

        // Send the data as JSON
        res.json({ universities });
    } catch (error) {
        console.error('Error fetching university data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
