function getNextOrCurrentTWT(day = 0) {
	const today = new Date();
	if (today.getDay() === day) {
		return today.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	} else {
		const daysUntilTWT = (day - today.getDay() + 7) % 7;
		const nextWeekday = new Date(today);
		nextWeekday.setDate(today.getDate() + daysUntilTWT);
		return nextWeekday.toLocaleDateString('en-US', {
			weekday: 'long',
			month: 'long',
			day: 'numeric',
			year: 'numeric',
		});
	}
}

function changeTuesdayText() {
	const tuesdayEl = [...document.querySelectorAll('.next-tuesday')];

	if (!tuesdayEl.length) return;

	const result = getNextOrCurrentTWT(2);

	tuesdayEl.forEach((wel) => {
		wel.textContent = result;
	});
}

function changeWednesdayText() {
	const wednesdayEl = [...document.querySelectorAll('.next-wednesday')];

	if (!wednesdayEl.length) return;

	const result = getNextOrCurrentTWT(3);

	wednesdayEl.forEach((wel) => {
		wel.textContent = result;
	});
}

function changeThursdayText() {
	const thursdayEl = [...document.querySelectorAll('.next-thursday')];

	if (!thursdayEl.length) return;

	const result = getNextOrCurrentTWT(4);

	thursdayEl.forEach((wel) => {
		wel.textContent = result;
	});
}

changeTuesdayText();
changeWednesdayText();
changeThursdayText();
