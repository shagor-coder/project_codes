function returnDomElementByPromise(selectorClass = '', type = '') {
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

async function autoSelectEvent() {
	const eventTypeInput = await returnDomElementByPromise(
		"[placeholder='Choose Event*']"
	);
	if (!eventTypeInput) return;
	const multiSelect = eventTypeInput.offsetParent;
	const options = [...multiSelect.querySelectorAll('.multiselect__option')];

	if (!options.length) return;

	const userEvent = JSON.parse(localStorage.getItem('_church-event-category'));

	if (!userEvent) return;

	const selectedEvent = options.find((op) =>
		op.textContent.trim().includes(userEvent)
	);

	if (!selectedEvent) return;

	selectedEvent.click();
}

const personInputSelectors = [
	{
		firstNameSelector: 'data-q="second_person_first_name"',
		lastNameSelector: 'data-q="second_person_last_name"',
	},
	{
		firstNameSelector: 'data-q="third_person_first_name"',
		lastNameSelector: 'data-q="third_person_last_name"',
	},
	{
		firstNameSelector: 'data-q="fourth_person_first_name"',
		lastNameSelector: 'data-q="fourth_person_last_name"',
	},
	{
		firstNameSelector: 'data-q="fifth_person_first_name"',
		lastNameSelector: 'data-q="fifth_person_last_name"',
	},
];

let personInputs = [];

function showPersonInfoInput(numberOfPerson = 0) {
	if (numberOfPerson === 0) return;
	hidePersonInputs(personInputs);
	const seletedPersons = personInputs.slice(0, numberOfPerson - 1);
	seletedPersons.forEach((pI) => {
		pI.firstName.parentElement.parentElement.style = `display:  !important`;
		pI.lastName.parentElement.parentElement.style = `display:  !important`;
	});
}

async function getNumberOfPerson() {
	const numberOfPersonInput = await returnDomElementByPromise(
		"[placeholder='Number of person*']"
	);
	if (!numberOfPersonInput) return;
	const multiSelect = numberOfPersonInput.offsetParent;

	const options = [...multiSelect.querySelectorAll('.multiselect__option')];

	if (!options.length) return;

	options.forEach((option) => {
		option.addEventListener('click', () => {
			showPersonInfoInput(Number(option.textContent.trim()));
		});
	});
}

function getAllPersonInputs() {
	personInputSelectors.forEach((pI) => {
		const obj = {};
		const pfnIn = document.querySelector(`[${pI.firstNameSelector}]`);
		const plnIn = document.querySelector(`[${pI.lastNameSelector}]`);
		obj.firstName = pfnIn;
		obj.lastName = plnIn;
		personInputs.push(obj);
	});

	hidePersonInputs(personInputs);
}

function hidePersonInputs(array) {
	array.forEach((pI) => {
		pI.firstName.parentElement.parentElement.style = `display: none !important`;
		pI.lastName.parentElement.parentElement.style = `display: none !important`;
	});
}

autoSelectEvent();
getAllPersonInputs();
getNumberOfPerson();
getAllPersonInputs();
