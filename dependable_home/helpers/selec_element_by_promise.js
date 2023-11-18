function select_element_by_promise(selectorClass = '', type = '') {
	return new Promise((res, rej) => {
		let element = null;
		let timeout;
		timeout = setInterval(() => {
			if (type === 'multi') {
				element = document.querySelectorAll(selectorClass);
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

export default select_element_by_promise;
