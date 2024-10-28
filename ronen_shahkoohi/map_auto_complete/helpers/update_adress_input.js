function update_adress_inputs(input, value) {
	const ev = new Event('input');
	input.value = value ? value : '';
	ev.initEvent('input', true);
	input.dispatchEvent(ev);
}

export default update_adress_inputs;
