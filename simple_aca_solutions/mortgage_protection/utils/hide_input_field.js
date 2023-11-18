export default function hide_input_field(input = Element) {
	input
		? (input.parentElement.parentElement.style = `display: none !important;`)
		: null;
}
