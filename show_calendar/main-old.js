import getCalendlyURL from './utils/getCalendlyURL';
import getContactByEmail from './utils/getContactByEmail';
import getUserById from './utils/getUserById';
import showCalendarToDOM from './utils/showCalenderToDOM';

const getCalendarURL = async () => {
	const url = new URL(location.href);

	const id = url.searchParams.get('id');

	if (!id) return;

	const contact = await getContactByEmail(id.trim().replaceAll(' ', ''));
	if (!contact) return;

	const contactAssignedId = contact.assignedTo ? contact.assignedTo : '';

	const associatedUser = await getUserById(contactAssignedId);

	if (!associatedUser) return;

	// const userCustomField = await getCalendlyURL(associatedUser.email);

	// console.log(userCustomField);

	// if (!userCustomField.value) return;

	// const calendarLink = userCustomField.value.trim();

	const customFields = contact.customField;
	if (!customFields) return;
	const calendarLink = customFields.find(
		(field) => field.id.trim() === 'rdM4um58D7th4eLjjKx8'
	);
	if (!calendarLink) return;

	const associatedUserName = associatedUser.name ? associatedUser.name : '';
	const associatedUserPhone = associatedUser.phone ? associatedUser.phone : '';
	const contactName = contact.firstName ? contact.firstName : '';

	const userProfile = {
		name: associatedUserName,
		phone: associatedUserPhone,
		contact_name: contactName,
	};

	console.log(userProfile);

	showCalendarToDOM(calendarLink.value, userProfile);
};

setTimeout(() => {
	getCalendarURL();
}, 5000);
