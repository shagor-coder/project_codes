import getCustomValues from './getCustomValues';

async function getCalendlyURL(email) {
	const customValues = await getCustomValues();
	if (!customValues.length) return {};
	const userCustomValue = customValues.find(
		(customValue) =>
			customValue.name.trim().toLowerCase() === email.trim().toLowerCase()
	);

	if (!userCustomValue) return {};

	return userCustomValue;
}

export default getCalendlyURL;
