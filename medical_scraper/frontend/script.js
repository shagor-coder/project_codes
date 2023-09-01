const form = document.getElementById('scrapeForm');
const resultContainer = document.getElementById('resultContainer');

form.addEventListener('submit', async (event) => {
	event.preventDefault();

	const url = form.querySelector('[name="url"]').value;
	const productSelector = form.querySelector('[name="productSelector"]').value;
	const priceSelector = form.querySelector('[name="priceSelector"]').value;
	const mainProductCardSelector = form.querySelector(
		'[name="mainProductCardSelector"]'
	).value;

	const requestData = {
		url: url,
		mainProductCardSelector: mainProductCardSelector,
		productSelector: productSelector,
		priceSelector: priceSelector,
	};

	try {
		const response = await fetch('http://127.0.0.1:3001/crawl', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(requestData),
			mode: 'cors', // Allow CORS for this request
		});

		if (response.ok) {
			const data = await response.json();
			displayResults(data);
		} else {
			const error = await response.json();
			displayError(error);
		}
	} catch (error) {
		console.error('An error occurred:', error);
		displayError({ error: 'An error occurred during the request.' });
	}
});

function displayResults(data) {
	const resultHTML = data
		.map(
			(item) => `
      <div class="my-4 p-4 bg-white rounded-lg shadow-md">
        <h2 class="text-lg font-semibold">${item.name}</h2>
        <p class="mt-2 text-gray-700">${item.price}</p>
      </div>
    `
		)
		.join('');

	resultContainer.innerHTML = resultHTML;
}

function displayError(error) {
	resultContainer.innerHTML = `
      <div class="my-4 p-4 bg-red-200 text-red-700 rounded-lg shadow-md">
        <p class="font-semibold">An error occurred:</p>
        <p>${error.error}</p>
      </div>
    `;
}
