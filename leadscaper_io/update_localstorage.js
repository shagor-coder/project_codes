function updateCategory() {
	const singleBlogCategory = [
		...document.querySelectorAll('.meta-section-1 .blog-category'),
	];
	if (!singleBlogCategory.length) return console.log('Not single');

	const categoryTextsArray = singleBlogCategory.map((sbC) =>
		sbC.textContent.trim()
	);
	const categoryTexts = categoryTextsArray
		.join(' ')
		.trim()
		.replaceAll('|', ' ');
	console.log(categoryTexts);
	const filteredEvent = removeMonthsAndYears(categoryTexts);
	localStorage.setItem(
		'_church-event-category',
		JSON.stringify(filteredEvent.trim())
	);
}

function removeMonthsAndYears(inputString) {
	const regex =
		/\b(?:January|February|March|April|May|June|July|August|September|October|November|December)\b|\b\d{4}\b/g;
	return inputString.replace(regex, '');
}

updateCategory();
