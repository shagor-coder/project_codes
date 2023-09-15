function return_random_number() {
	const number = Math.round(Math.random() * 9);
	return number;
}
export default function create_four_digit_pin() {
	let pin_number1 = return_random_number();
	let pin_number2 = return_random_number();
	let pin_number3 = return_random_number();
	let pin_number4 = return_random_number();

	console.log(pin_number1, pin_number2, pin_number3, pin_number4);

	return `${pin_number1}${pin_number2}${pin_number3}${pin_number4}`;
}
