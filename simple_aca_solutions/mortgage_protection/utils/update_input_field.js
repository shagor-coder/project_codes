export default function update_input_field(input = Element, value = '') {
	const event = new Event('input');
	event.initEvent('input', true, true);
	input ? (input.value = value.trim()) : null;
	input ? input.dispatchEvent(event) : null;
}
