import create_four_digit_pin from './utils/create_four_digit_pin';
import hide_input_field from './utils/hide_input_field';
import update_input_field from './utils/update_input_field';

const verification_input_field = document.querySelector(
	'[data-q="verification_pin"]'
);

async function main() {
	const pin_number = create_four_digit_pin();
	hide_input_field(verification_input_field);
	update_input_field(verification_input_field, pin_number);
}

main();
