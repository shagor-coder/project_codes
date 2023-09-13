function getNextOrCurrentWednesday() {
	const today = new Date();
	if (today.getDay() === 3) {
		return today.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
		});
	} else {
		const daysUntilWednesday = (3 - today.getDay() + 7) % 7;
		const nextWednesday = new Date(today);
		nextWednesday.setDate(today.getDate() + daysUntilWednesday);
		return nextWednesday.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
		});
	}
}

function changeWednesdayText() {
	const wednesdayEl = [...document.querySelectorAll('.show-wednesday')];

	if (!wednesdayEl.length) return;

	const result = getNextOrCurrentWednesday();

	wednesdayEl.forEach((wel) => {
		const oldText = wel.textContent.trim();
		const newText = oldText.replace('this_wednesday', result);
		wel.textContent = newText;
	});
}

changeWednesdayText();
