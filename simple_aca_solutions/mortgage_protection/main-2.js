import get_user_data from './utils/get_user_data';
import update_contact_tags from './utils/update_contact_tags';

const next_step = document.querySelector('.next_step');

const pin_form = document.querySelector('#pinForm');
const button = document.querySelector('#pinForm button');
const location_key = '{{ custom_values.location_api_key }}';

async function update_contact(id, api_key) {
	try {
		const updated = await update_contact_tags(
			id.trim(),
			['verified', 'mortgage protection'],
			api_key
		);
		console.log({ updated });
		button.innerHTML = 'Success!!';
		setTimeout(() => {
			next_step.click();
		}, 1500);
	} catch (error) {
		throw new Error(error);
	}
}

async function check_user_pin_enter(e) {
	e.preventDefault();
	const _ud = get_user_data();
	const { id, verification_pin } = _ud;
	if (!id || !verification_pin) return console.log('No User data found!!');

	const digit1 = document.getElementById('digit1').value.trim();
	const digit2 = document.getElementById('digit2').value.trim();
	const digit3 = document.getElementById('digit3').value.trim();
	const digit4 = document.getElementById('digit4').value.trim();

	const user_entered_pin = digit1 + digit2 + digit3 + digit4;

	if (user_entered_pin.trim() === verification_pin.trim()) {
		button.innerHTML = 'Sending...';
		await update_contact(id, location_key);
	} else {
		button.innerHTML = 'Wrong Pin!!';
		button.classList.add('error');
		setTimeout(() => {
			button.innerHTML = 'Verify';
			button.classList.remove('error');
		}, 1500);
	}
}

pin_form.addEventListener('submit', check_user_pin_enter);
