const puppeteer = require('puppeteer');

async function scrapeData(
	url,
	mainProductCardSelector,
	productSelector,
	priceSelector
) {
	try {
		const browser = await puppeteer.launch({ headless: true });
		const page = await browser.newPage();

		await page.goto(url);

		// Wait for the main product card elements to be available
		await page.waitForSelector(mainProductCardSelector);

		// Extract product data
		const productCards = await page.$$(mainProductCardSelector);
		const scrapedData = [];

		for (const card of productCards) {
			await card.waitForSelector(productSelector);
			const productName = await card.$eval(productSelector, (el) =>
				el.textContent.trim()
			);
			await card.waitForSelector(priceSelector);
			const productPrice = await card.$eval(priceSelector, (el) =>
				el.textContent.trim()
			);

			scrapedData.push({
				name: productName,
				price: productPrice,
			});
		}

		await browser.close();

		return scrapedData;
	} catch (error) {
		console.error('Error during scraping:', error);
		throw error;
	}
}

module.exports = scrapeData;
