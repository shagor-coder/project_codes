function returnElementByClass(className) {
	return new Promise((re, rj) => {
		let interVal;
		let elements;
		interVal = setInterval(() => {
			elements = document.querySelectorAll(className);
			if (!elements) return;
			clearInterval(interVal);
			re([...elements]);
		}, 300);
		setTimeout(() => {
			if (!elements.length) {
				clearInterval(interVal);
				rj('No Element Found!');
			}
		}, 10000);
	});
}

export default returnElementByClass;
