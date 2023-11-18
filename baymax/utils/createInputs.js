const states = [
	'Alabama',
	'Alaska',
	'Arizona',
	'Arkansas',
	'California',
	'Colorado',
	'Connecticut',
	'Delaware',
	'Florida',
	'Georgia',
	'Hawaii',
	'Idaho',
	'Illinois',
	'Indiana',
	'Iowa',
	'Kansas',
	'Kentucky',
	'Louisiana',
	'Maine',
	'Maryland',
	'Massachusetts',
	'Michigan',
	'Minnesota',
	'Mississippi',
	'Missouri',
	'Montana',
	'Nebraska',
	'Nevada',
	'New Hampshire',
	'New Jersey',
	'New Mexico',
	'New York',
	'North Carolina',
	'North Dakota',
	'Ohio',
	'Oklahoma',
	'Oregon',
	'Pennsylvania',
	'Rhode Island',
	'South Carolina',
	'South Dakota',
	'Tennessee',
	'Texas',
	'Utah',
	'Vermont',
	'Virginia',
	'Washington',
	'West Virginia',
	'Wisconsin',
	'Wyoming',
];

let customInputValues = {
	callbackname: '',
	currentStates: [],
	additionalInfo: '',
};

function enableDisableFormBtn(formBtns) {
	const { callbackname, currentStates, additionalInfo } = customInputValues;
	if (callbackname && currentStates.length && additionalInfo) {
		formBtns?.forEach((btn) => {
			btn.style.opacity = '1';
			btn.style.pointerEvents = 'all';
		});
	} else {
		formBtns?.forEach((btn) => {
			btn.style.opacity = '0.5';
			btn.style.pointerEvents = 'none';
		});
	}
}

function createCurrentStates(currentStatesCon, inputCheck) {
	const span = document.createElement('span');
	span.id = inputCheck.id;
	span.innerHTML = inputCheck.value + '&times;';
	span.addEventListener('click', () => {
		inputCheck.click();
		span.remove();
	});
	currentStatesCon.append(span);
}

function handleCheckUncheck(
	label,
	inputCheck,
	currentStatesCon,
	placeholder,
	formBtns
) {
	console.log(inputCheck, inputCheck.checked);
	if (!inputCheck.checked) {
		customInputValues.currentStates = customInputValues.currentStates.filter(
			(state) => state.trim().toLowerCase() !== inputCheck.id.trim()
		);
		localStorage.setItem(
			'_customInputValues',
			JSON.stringify(customInputValues)
		);
		label.style.opacity = '1';
		label.style.pointerEvents = 'all';
	} else {
		label.style.opacity = '0.5';
		label.style.pointerEvents = 'none';
		customInputValues.currentStates.push(inputCheck.value);
		localStorage.setItem(
			'_customInputValues',
			JSON.stringify(customInputValues)
		);
		createCurrentStates(currentStatesCon, inputCheck);
	}

	if (!customInputValues.currentStates.length) {
		placeholder.style.display = 'flex';
	} else {
		placeholder.style.display = 'none';
	}

	enableDisableFormBtn(formBtns);
}

function createStatesOptions(
	statesOptions,
	currentStatesCon,
	placeholder,
	formBtns
) {
	states.forEach((state) => {
		const label = document.createElement('label');
		label.innerHTML = state.trim();
		label.htmlFor = state.trim().toLowerCase().replaceAll(' ', '_');
		const inputCheck = document.createElement('input');
		inputCheck.type = 'checkbox';
		inputCheck.id = state.trim().toLowerCase().replaceAll(' ', '_');
		inputCheck.value = state.trim();
		inputCheck.hidden = true;
		label.style.cursor = 'pointer';

		label.append(inputCheck);
		inputCheck.addEventListener('input', (e) => {
			handleCheckUncheck(
				label,
				inputCheck,
				currentStatesCon,
				placeholder,
				formBtns
			);
		});
		statesOptions.append(label);
	});
}

function createTargetStates(formBtns = []) {
	const statesContainer = document.createElement('div');
	statesContainer.classList = '_targetStatesMain';
	statesContainer.innerHTML = `
      <div class="_currentStatesMain">
        <p class="_placeholder">Please select your target states</p>
        <div class="_currentStates"></div>
      </div>
      <div class="_statesOptions"></div>
    `;

	const placeholder = statesContainer.querySelector('._placeholder');
	const currentStatesCon = statesContainer.querySelector('._currentStates');
	const statesOptions = statesContainer.querySelector('._statesOptions');

	createStatesOptions(statesOptions, currentStatesCon, placeholder, formBtns);

	return statesContainer;
}

function createCallBackName(formBtns = []) {
	const callBackInput = document.createElement('input');
	callBackInput.classList = 'form-input input';
	callBackInput.placeholder = 'Call back name?';
	callBackInput.id = 'callbackname';

	callBackInput.addEventListener('input', () => {
		customInputValues.callbackname = callBackInput.value;

		localStorage.setItem(
			'_customInputValues',
			JSON.stringify(customInputValues)
		);

		enableDisableFormBtn(formBtns);
	});

	return callBackInput;
}

function createAdditionalInfo(formBtns = []) {
	const additionalInfoInput = document.createElement('input');
	additionalInfoInput.classList = 'form-input input';
	additionalInfoInput.placeholder = 'Additional Info Request';
	additionalInfoInput.id = 'additionalInfo';

	additionalInfoInput.addEventListener('input', () => {
		customInputValues.additionalInfo = additionalInfoInput.value;

		localStorage.setItem(
			'_customInputValues',
			JSON.stringify(customInputValues)
		);

		enableDisableFormBtn(formBtns);
	});

	return additionalInfoInput;
}

export { createTargetStates, createCallBackName, createAdditionalInfo };
