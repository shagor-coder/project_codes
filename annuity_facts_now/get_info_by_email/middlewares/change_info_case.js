function change_info_text_case(info) {
    return info.toLowerCase().replace(/\b\w/g, match => match.toUpperCase());
}

module.exports = change_info_text_case