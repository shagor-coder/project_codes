function returnDomElementByPromise(selectorClass = '', type = '') {
	return new Promise((res, rej) => {
		let element = null;
		let timeout;
		timeout = setInterval(() => {
			if (type === 'multi') {
				element = [...document.querySelectorAll(selectorClass)];
			} else {
				element = document.querySelector(selectorClass);
			}

			if (!element) return;
			clearInterval(timeout);
			res(element);
		}, 300);

		setTimeout(() => {
			if (!element) {
				clearInterval(timeout);
				res(false);
			}
		}, 10000);
	});
}

function fireEventOnProduct(input) {
	if (input.checked) return;
	const e = new Event('change');
	e.initEvent('change', true, true);
	input.checked = true;
	input.dispatchEvent(e);
}

async function getAllProducts() {
	const productDescriptions = await returnDomElementByPromise(
		'.product-description',
		'multi'
	);

	if (!productDescriptions.length) return;

	productDescriptions.forEach((des) => {
		const input = des.querySelector('input');
		if (!input) return;
		fireEventOnProduct(input);
	});
}

getAllProducts();
