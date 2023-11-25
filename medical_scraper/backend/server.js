const express = require('express');
const puppeteer = require('puppeteer');
const cors = require('cors'); // Import the cors package
const scrapeData = require('./middlewares/crawler');
const app = express();
const PORT = process.env.PORT || 3001;
const HOST = '0.0.0.0';

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Use the cors middleware

app.get('/', (req, res) => {
	res.send('Hello World!');
});

app.post('/crawl', async (req, res) => {
	const { url, mainProductCardSelector, productSelector, priceSelector } =
		req.body;

	try {
		const scrapedData = await scrapeData(
			url,
			mainProductCardSelector,
			productSelector,
			priceSelector
		);
		res.json(scrapedData);
	} catch (error) {
		console.error('An error occurred:', error);
		res.status(500).json({ error: 'An error occurred during scraping.' });
	}
});

app.listen(PORT, HOST, () => {
	console.log(`Server running at http://127.0.0.1:${PORT}`);
});
