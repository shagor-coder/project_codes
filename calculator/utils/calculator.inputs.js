export const create_fields = (fields = [], step_el) => {
	fields.forEach((input_field) => {
		const input_block = document.createElement('div');
		input_block.classList = `calculator_input_block`;

		const label = document.createElement('label');
		label.classList = `calculator_input_label`;
		label.innerHTML = input_field.label;

		input_block.append(label);

		if (input_field.field_type === 'text') {
			const input = document.createElement('input');
			input.type = 'text';
			input.dataset.key = input_field.field_key;
			input_block.append(input);
		}

		if (input_field.field_type === 'select') {
			const select = document.createElement('select');
			const options = input_field.options || [];
			options.forEach((input_option) => {
				const option = document.createElement('option');
				option.value = input_option;
				option.innerHTML = input_option;
				select.append(option);
			});
			select.dataset.key = input_field.field_key;
			input_block.append(select);
		}

		if (input_field.field_type === 'range') {
			const input = document.createElement('input');
			input.type = 'range';
			input.min = input_field.min;
			input.max = input_field.max;
			input.step = input_field.step;
			input.dataset.key = input_field.field_key;
			input_block.append(input);
		}

		step_el.append(input_block);
	});
};
