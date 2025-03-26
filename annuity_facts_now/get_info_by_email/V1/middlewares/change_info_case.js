function change_info_text_case(info) {
	if (typeof info === 'number') return info;
	return info.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());
}

module.exports = change_info_text_case;
