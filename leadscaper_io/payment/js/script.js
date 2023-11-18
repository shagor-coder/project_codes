(function () {
	// Get the gift type radio buttons and the frequency options div
	const clientData = {
		amount: {
			min: 10,
			max: 1000,
		},
		givingType: ['General Fund - North Point', 'Be Rich - North Point'],
		transactionFees: {
			rate: 0.025,
			transfees: 0.35,
		},
	};

	const paymentData = {
		Method: 'CreditCardAuthorize',
		TerminalId: '1000001581515',
		TerminalKey: 'cce5d0f9-d7ba-440b-a64a-a30006cf860c',
		AccountInfo: '',
		ExpirationInfo: '',
		TotalAmount: 0,
		GiftType: 'Set Up Recurring',
		Frequency: 'Every Week',
		StartDate: '',
		GivingType: clientData.givingType[0],
		ReferenceNumber: '',
		CustomerIP: '',
		CVV2: '',
		CardHolderName: '',
		BillingAddress: '',
		BillingCity: '',
		BillingState: '',
		BillingZip: '',
		Country: 'US',
		CardName: '',
	};

	const giftTypeRadios = [
		...document.querySelectorAll('input[name="GiftType"]'),
	];
	const frequencyOptions = document.querySelector('#frequency-options');
	const frequencyInputs = [...document.querySelectorAll('[name="Frequency"]')];
	const givingTypeInput = document.querySelector('#giving-type');
	const infoCard = document.querySelector('.info-card');
	const nextButton = infoCard.querySelector('#info_button');
	const amoutInput = document.querySelector('#amount');
	const amoutError = document.querySelector('.error-message');
	const coverExpense = document.querySelector('#coverExpense');
	const newTotalMessage = document.querySelector('#new_total');

	function addGivingTypeOptions() {
		clientData.givingType.forEach((cd) => {
			const option = document.createElement('option');
			option.value = cd.trim();
			option.innerHTML = cd.trim();
			givingTypeInput.append(option);
		});
	}

	function handleGivingTypeInput() {
		paymentData.GivingType = givingTypeInput.value;
	}

	givingTypeInput.addEventListener('change', handleGivingTypeInput);
	addGivingTypeOptions();

	// Add a change event listener to the gift type radios
	giftTypeRadios.forEach((radio) => {
		radio.addEventListener('change', () => {
			if (radio.value !== 'Give One Time') {
				frequencyOptions.style.display = 'block';
			} else {
				frequencyOptions.style.display = 'none';
				paymentData.Frequency = '';
			}
			paymentData.GiftType = radio.value;
		});
	});

	// Handle Calendar
	const pikadayAll = document.querySelector('#StartDateAll');
	const pikadayOneFifteen = document.querySelector('#StartDate115th');

	let pikadayOneFifteenInstance;

	function generatePikadayForAll() {
		let allPikaday = new Pikaday({
			field: pikadayAll,
			format: 'MM/DD/YYYY',
			yearRange: [1900, moment().year() + 1],
			onSelect: function (date) {
				const selectedDate = moment(date);
				const formattedDate = moment(selectedDate).format('MM-DD-YYYY');
				paymentData.StartDate = formattedDate;
			},
			disableDayFn: function (date) {
				const selectedDate = moment(date);
				const currentDate = moment();
				const isLateDate = currentDate.date() < 15;
				if (isLateDate) {
					return selectedDate.isBefore(currentDate, 'day');
				}
				return false;
			},
		});

		setDefaultDate(allPikaday);
	}

	function generatePikadayForFifteen() {
		pikadayOneFifteenInstance = new Pikaday({
			field: pikadayOneFifteen,
			format: 'MM/DD/YYYY',
			yearRange: [1900, moment().year() + 1],
			onSelect: function (date) {
				const selectedDate = moment(date);
				const formattedDate = moment(selectedDate).format('MM-DD-YYYY');
				paymentData.StartDate = formattedDate;
			},
			disableDayFn: function (date) {
				const selectedDate = moment(date);
				const currentDate = moment();
				const isBefore15th = currentDate.date() < 15;
				const isFirstAndFifteen = paymentData.Frequency === '1 15 Month';
				if (!isFirstAndFifteen) return console.log('Normal');

				if (isBefore15th) {
					return !(
						(selectedDate.date() === 1 || selectedDate.date() === 15) &&
						currentDate.month() <= selectedDate.month()
					);
				} else {
					return !(
						(selectedDate.date() >= 1 || selectedDate.date() === 15) &&
						currentDate.month() < selectedDate.month()
					);
				}
			},
		});

		setDefaultDate(pikadayOneFifteenInstance, '1/15');
	}

	generatePikadayForAll();

	// Selets The Current Date
	function setDefaultDate(pikadayInstance, pikadaytype = '') {
		const currentDate = moment();
		if (pikadaytype === '1/15') {
			if (currentDate.date() > 15) {
				pikadayInstance.setDate(
					currentDate.add(1, 'months').date(1).format('MM/DD/YYYY')
				);
				paymentData.StartDate = currentDate
					.add(1, 'months')
					.date(1)
					.format('MM-DD-YYYY');
			} else if (currentDate.date() > 1) {
				pikadayInstance.setDate(currentDate.date(15).format('MM-DD-YYYY'));
				paymentData.StartDate = currentDate.date(15).format('MM-DD-YYYY');
			} else {
				pikadayInstance.setDate(currentDate.date(1).format('MM-DD-YYYY'));
				paymentData.StartDate = currentDate.date(1).format('MM-DD-YYYY');
			}
		} else {
			pikadayInstance.setDate(currentDate.format('MM/DD/YYYY'));
			paymentData.StartDate = currentDate.format('MM-DD-YYYY');
		}
	}

	// Handle Frequency
	function handleFrequencyChanged() {
		const currentDate = moment();
		frequencyInputs.forEach((input) => {
			input.addEventListener('change', () => {
				paymentData.Frequency = input.value;
				if (paymentData.Frequency === '1 15 Month') {
					pikadayAll.style = 'display: none !important';
					pikadayOneFifteen.style = 'display: block !important';
					if (pikadayOneFifteenInstance) return;
					generatePikadayForFifteen();
				} else {
					pikadayAll.style = 'display: block !important';
					pikadayOneFifteen.style = 'display: none !important';
					paymentData.StartDate = currentDate.format('MM-DD-YYYY');
				}
			});
		});
	}

	handleFrequencyChanged();

	// Check Min And Max Value

	function validateAmoutInput() {
		if (amoutInput.value < clientData.amount.min) {
			amoutError.style.display = 'block';
			return (
				(amoutError.innerText = `Input must be between ${clientData.amount.min} and ${clientData.amount.max}.`),
				newTotalMessage.classList.add('visually-hidden'),
				(nextButton.disabled = 'disabled')
			);
		}

		if (amoutInput.value > clientData.amount.max) {
			amoutError.style.display = 'block';
			return (
				(amoutError.innerText = `Input must be between ${clientData.amount.min} and ${clientData.amount.max}.`),
				newTotalMessage.classList.add('visually-hidden'),
				(nextButton.disabled = 'disabled')
			);
		}

		amoutError.style.display = 'none';
		paymentData.TotalAmount = amoutInput.value;
		nextButton.disabled = '';
		// Calculates On Every Input
		calculateExpense();
	}

	coverExpense.addEventListener('change', calculateExpense);

	// Calculate Expense
	function calculateExpense() {
		if (!coverExpense.checked || amoutInput.value < clientData.amount.min)
			return (
				newTotalMessage.classList.add('visually-hidden'),
				(paymentData.TotalAmount = amoutInput.value)
			);

		const charge = parseFloat(
			amoutInput.value * clientData.transactionFees.rate
		).toFixed(2);

		const newTotalAmount = parseFloat(
			Number(amoutInput.value) +
				Number(charge) +
				Number(clientData.transactionFees.transfees)
		).toFixed(2);

		newTotalMessage.classList.remove('visually-hidden');
		newTotalMessage.innerHTML = `You'r new total will be ${newTotalAmount}$`;
		paymentData.TotalAmount = newTotalAmount;
	}

	amoutInput.addEventListener('input', validateAmoutInput);

	const cardNumberInput = document.querySelector('#card-number');
	const cardBrandLogo = document.querySelector('.card-brand span i');
	const cardNameInput = document.querySelector('#card-name');
	const expiryDateInput = document.querySelector('#expiry-date');
	const cvvInput = document.querySelector('#cvv');
	const payButton = document.querySelector('#payButton');
	const confirmPaymentButton = document.querySelector('#confirmPaymentButton');

	const cardBrandWithIcon = [
		{
			name: 'visa',
			regex: /^4[0-9]{12}(?:[0-9]{3})?$/,
			icon: 'fab fa-cc-visa',
		},
		{
			name: 'mastercard',
			regex: /^5[1-5][0-9]{14}$/,
			icon: 'fab fa-cc-mastercard',
		},
		{
			name: 'amex',
			regex: /^3[47][0-9]{13}$/,
			icon: 'fab fa-cc-amex',
		},
		{
			name: 'discover',
			regex: /^6(?:011|5[0-9]{2})[0-9]{12}$/,
			icon: 'fab fa-cc-discover',
		},
		{
			name: 'dinersclub',
			regex: /^3(?:0[0-5]|[68][0-9])[0-9]{11}$/,
			icon: 'fab fa-cc-diners-club',
		},
		{
			name: 'jcb',
			regex: /^(?:2131|1800|35\d{3})\d{11}$/,
			icon: 'fab fa-cc-jcb',
		},
		{
			name: 'maestro',
			regex: /^(5018|5020|5038|6304|6759|676[1-3])\d{8,15}$/,
			icon: 'fab fa-cc-maestro',
		},
		{
			name: 'unionpay',
			regex: /^(62[0-9]{14,17})$/,
			icon: 'fab fa-cc-unionpay',
		},
		{
			name: 'elo',
			regex:
				/^(40117[8-9]|431274|438935|451416|457393|504175|506699|5067[0-6][0-9]|509[0-9][0-9][0-9]|6504[0-9]{12}|6504[0-9]{15})$/,
			icon: 'fab fa-cc-elo',
		},
		{
			name: 'mir',
			regex: /^220[0-4][0-9]{12}$/,
			icon: 'fab fa-cc-mir',
		},
		{
			name: 'troy',
			regex: /^9792\d{12}$/,
			icon: 'fab fa-cc-troy',
		},
		{
			name: 'nps',
			regex: /^606282\d{10}$/,
			icon: 'fab fa-cc-nps',
		},
		{
			name: 'uatp',
			regex: /^1\d{14}$/,
			icon: 'fab fa-cc-uatp',
		},
		{
			name: 'rupay',
			regex:
				/^(6061|6062|6063|6064|6065|6066|6067|6068|6069|607|608|609|603|652|653)\d{10}$/,
			icon: 'fab fa-cc-rupay',
		},
	];

	// Add an input event listener to detect the card brand
	function handleCardNumberInput() {
		const cardNumber = cardNumberInput.value;
		const detectedBrand = detectCreditCardBrand(cardNumber);

		if (detectedBrand.name !== 'Unknown') {
			cardBrandLogo.className = detectedBrand.icon;
			cvvInput.setAttribute(
				'maxlength',
				detectedBrand.name === 'amex' ? '4' : '3'
			);
			cardNumberInput.setAttribute(
				'maxlength',
				detectedBrand.name === 'amex' ? '15' : '16'
			);
			paymentData.CardName = detectedBrand.name.trim().toUpperCase();
		} else {
			cardBrandLogo.className = 'far fa-credit-card';
			cvvInput.setAttribute('maxlength', '3');
		}
	}

	function detectCreditCardBrand(cardNumber) {
		for (const card of cardBrandWithIcon) {
			if (card.regex.test(cardNumber)) {
				return card;
			}
		}
		return { name: 'Unknown', regex: null, icon: '' };
	}

	// Function to check if expiry date is good
	function isValidExpiryDate(expiryDate) {
		const [month, year] = expiryDate.split('/');
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear() % 100;
		const currentMonth = currentDate.getMonth() + 1;

		if (
			/^\d{2}\/\d{2}$/.test(expiryDate) &&
			parseInt(month, 10) >= 1 &&
			parseInt(month, 10) <= 12 &&
			parseInt(year, 10) >= currentYear &&
			(parseInt(year, 10) > currentYear || parseInt(month, 10) >= currentMonth)
		) {
			return true;
		}

		return false;
	}

	// Function to check if all fields are filled
	function checkAllPaymentInfo() {
		const cardNameValue = cardNameInput.value.trim();
		const cardNumberValue = cardNumberInput.value.trim();
		const expiryDateValue = expiryDateInput.value.trim();
		const cvvValue = cvvInput.value.trim();

		paymentData[cardNameInput.name.trim()] = cardNameValue;
		paymentData[cardNumberInput.name.trim()] = cardNumberValue;
		paymentData[expiryDateInput.name.trim()] = expiryDateValue.replace('/', '');
		paymentData[cvvInput.name.trim()] = cvvValue;

		if (
			cardNameValue &&
			cardNumberValue &&
			cvvValue.length === (cardBrandLogo.className.includes('amex') ? 4 : 3) &&
			isValidExpiryDate(expiryDateValue)
		) {
			payButton.removeAttribute('disabled');
		} else {
			payButton.setAttribute('disabled', 'true');
		}
	}

	function handlePayButtonClick() {
		document.getElementById('confirmationTotalAmount').textContent =
			'$ ' + paymentData.TotalAmount;
		document.getElementById('confirmationScheduled').textContent = moment(
			paymentData.StartDate,
			'MM-DD-YYYY'
		).format('DD MMM YYYY');
		document.getElementById('confirmationCardType').textContent =
			paymentData.CardName;
		document.getElementById('confirmationLastFourDigits').textContent =
			paymentData.AccountInfo.slice(-4);
	}

	// Add event listeners to each input field to check for changes
	cardNameInput.addEventListener('input', checkAllPaymentInfo);
	cardNumberInput.addEventListener('input', checkAllPaymentInfo);
	cardNumberInput.addEventListener('input', handleCardNumberInput);
	expiryDateInput.addEventListener('input', checkAllPaymentInfo);
	cvvInput.addEventListener('input', checkAllPaymentInfo);
	payButton.addEventListener('click', handlePayButtonClick);

	// Send The Complete Payment Request
	async function handlePaymentRequest() {
		const baseURL = 'https://gateway.paymentworld.com/WebHost2012/WebHost.aspx';

		let params = '?Country=US';

		const keys = Object.keys(paymentData);

		if (!keys.length) return;

		keys.forEach((key) => {
			if (!paymentData[key] || paymentData[key] === '') return;
			params += '&' + key + '=' + paymentData[key];
		});

		try {
			const requestURL = baseURL + params;
			const request = await fetch(requestURL, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
			});
			const response = await request.json();
			console.log(response);
			alert('Payment Completed');
		} catch (error) {
			console.log(error);
			alert('Payment Error!!!');
		}
	}

	confirmPaymentButton.addEventListener('click', handlePaymentRequest);

	// For Tooltips
	var tooltipTriggerList = [].slice.call(
		document.querySelectorAll('[data-bs-toggle="tooltip"]')
	);
	var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
		return new bootstrap.Tooltip(tooltipTriggerEl);
	});
})();
