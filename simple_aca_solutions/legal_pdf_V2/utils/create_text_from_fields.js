function create_text_from_custom_fields(custom_fields = {}) {
	const custom_fields_key = Object.keys(custom_fields);
	const texts = custom_fields_key.map((field) => {
		let ques = `Q. ${field} \n`;
		let ans = `A. ${custom_fields[field]} \n`;

		return ques + ans;
	});

	return texts.join('');
}

module.exports = create_text_from_custom_fields;
