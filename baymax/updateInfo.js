import updatePurchasedContact from './utils/updateContact';

const apiKey = '537e7e3b-5744-4f0b-b02e-6c7c8b5878a1';

async function updateInfo() {
	const customInputValues = JSON.parse(
		localStorage.getItem('_customInputValues')
	);
	if (!customInputValues) return;
	const _ud = JSON.parse(localStorage.getItem('_ud'));
	if (!_ud.email) return;

	const { id, email, phone } = _ud;
	const { callbackname, currentStates, additionalInfo } = customInputValues;

	const updateBody = {
		email: email,
		phone: phone,
		customField: {
			call_back_name: callbackname,
			select_a_astes: currentStates,
			additional_info_request: additionalInfo,
		},
	};

	try {
		const updated = await updatePurchasedContact(apiKey, updateBody, id.trim());
		console.log(updated);
	} catch (error) {
		console.log(error.message);
	}
}

updateInfo();
