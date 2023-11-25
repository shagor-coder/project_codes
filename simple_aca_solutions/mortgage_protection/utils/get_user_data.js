export default function get_user_data() {
	const _ud = JSON.parse(localStorage.getItem('_ud'));
	return _ud;
}
