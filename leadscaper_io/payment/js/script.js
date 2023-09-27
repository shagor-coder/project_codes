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
	TotalAmount: '',
	GiftType: 'Set Up Recurring',
	Frequency: 'Every 2 Weeks',
	StartDate: '',
	GivingType: clientData.givingType[0],
	ReferenceNumber: 'RudyTest1',
	CustomerIP: '70.93.203.74',
	CVV2: '',
	CardHolderName: '',
	BillingAddress: '',
	BillingCity: '',
	BillingState: '',
	BillingZip: '',
	Country: 'US',
};

const giftTypeRadios = document.querySelectorAll('input[name="gift-type"]');
const frequencyOptions = document.getElementById('frequency-options');
const frequencyInputs = [...document.querySelectorAll('[name="Frequency"]')];
const givingTypeInput = document.querySelector('#giving-type');
const infoCard = document.querySelector('.info-card');
const paymentCard = document.querySelector('.payment-card');
const nextButton = infoCard.querySelector('button');
const amoutInput = document.getElementById('amount');
const amoutError = document.querySelector('.error-message');

function addGivingTypeOptions() {
	clientData.givingType.forEach((cd) => {
		const option = document.createElement('option');
		option.value = cd.trim();
		option.innerHTML = cd.trim();
		givingTypeInput.append(option);
	});
}

addGivingTypeOptions();

// Add a change event listener to the gift type radios
giftTypeRadios.forEach((radio) => {
	radio.addEventListener('change', () => {
		// Check if "Set up recurring" is selected
		if (radio.value !== 'Give One Time') {
			// Show the frequency options
			frequencyOptions.style.display = 'none';
		} else {
			// Hide the frequency options
			frequencyOptions.style.display = 'block';
		}

		paymentData.GiftType = radio.value;
	});
});

// Handle Calendar
const pikadayAll = document.getElementById('StartDateAll');
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
			console.log(formattedDate);
		},
		disableDayFn: function (date) {
			const selectedDate = moment(date);
			const currentDate = moment();
			const isBefore15th = currentDate.date() < 15;
		},
	});
}

function generatePikadayForFifteen() {
	pikadayOneFifteenInstance = new Pikaday({
		field: pikadayOneFifteen,
		format: 'MM/DD/YYYY',
		yearRange: [1900, moment().year() + 1], // Adjust the year range as needed
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
					(selectedDate.date() === 1 || selectedDate.date() === 15) &&
					currentDate.month() < selectedDate.month()
				);
			}
		},
	});

	setDefaultDate(pikadayOneFifteenInstance);
}

generatePikadayForAll();

// Handle Frequency
function handleFrequencyChanged() {
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
			}
		});
	});
}

handleFrequencyChanged();

// Check Min And Max Value

function validateAmoutInput() {
	const inputValue = parseFloat(amoutInput.value).toFixed(2);

	console.log(inputValue.replace(/\.0*$/, ''));

	if (inputValue.replace(/\.0*$/, '') < clientData.amount.min) {
		amoutError.style.display = 'block';
		return (amoutError.innerText = `Input must be between ${clientData.amount.min} and ${clientData.amount.max}.`);
	}

	if (inputValue.replace(/\.0*$/, '') > clientData.amount.max) {
		amoutError.style.display = 'block';
		return (amoutError.innerText = `Input must be between ${clientData.amount.min} and ${clientData.amount.max}.`);
	}

	amoutError.style.display = 'none';
}

amoutInput.addEventListener('input', validateAmoutInput);

// Selets The Current Date
function setDefaultDate(pikadayInstance) {
	const currentDate = moment();
	const isBefore15th = currentDate.date() < 15;

	if (isBefore15th) {
		pikadayInstance.setDate(currentDate.date(1).format('MM/DD/YYYY'));
	} else {
		pikadayInstance.setDate(
			currentDate.add(1, 'months').date(1).format('MM/DD/YYYY')
		);
	}
}

// Get the card number input element
const cardNumberInput = document.getElementById('card-number');
// Get the card brand logo element
const cardBrandLogo = document.querySelector('.card-brand span i');

// Add an input event listener to detect the card brand
cardNumberInput.addEventListener('input', () => {
	const cardNumber = cardNumberInput.value;

	// Regular expressions for Visa, MasterCard, and American Express
	const visaPattern = /^4[0-9]{12}(?:[0-9]{3})?$/;
	const mastercardPattern = /^5[1-5][0-9]{14}$/;

	if (visaPattern.test(cardNumber)) {
		cardBrandLogo.className = 'fab fa-cc-visa';
	} else if (mastercardPattern.test(cardNumber)) {
		cardBrandLogo.className = 'fab fa-cc-mastercard';
	} else {
		cardBrandLogo.className = 'far fa-credit-card'; // Reset to default
	}
});

// Processing Fees 2.5% + 0.35
