import create_four_digit_pin from './utils/create_four_digit_pin';
import hide_input_field from './utils/hide_input_field';
import update_input_field from './utils/update_input_field';

let limit = 20;
let intervalId;
let isRunning = true;

function getElementByInterval() {
	limit--;

	if (limit === 0 || !isRunning) {
		clearInterval(intervalId);
		return console.log('Done!!!');
	}

	const verification_input_field = document.querySelector(
		'[data-q="pin_verification"]'
	);
	if (verification_input_field) {
		clearInterval(intervalId);
		main(verification_input_field);
		isRunning = false;
	}
}

intervalId = setInterval(getElementByInterval, 500);

setTimeout(() => {
	isRunning = false;
	clearInterval(intervalId);
}, 9000);

getElementByInterval();

async function main(verification_input_field) {
	const pin_number = create_four_digit_pin();
	hide_input_field(verification_input_field);
	update_input_field(verification_input_field, pin_number);
}
