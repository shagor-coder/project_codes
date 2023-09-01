import replaceInnerText from './replaceInnerText';

// const calendlyScript = document.createElement('script');
// calendlyScript.src = 'https://assets.calendly.com/assets/external/widget.js';
// calendlyScript.async = '';

const showCalendarToDOM = (calendarURL, userInfo) => {
	const calendarContainers = [...document.querySelectorAll('.calendar_embed')];
	if (!calendarContainers.length) return;

	calendarContainers.forEach((calendarContainer) => {
		calendarContainer.innerHTML = `
    <iframe src=${calendarURL} style="min-width:320px;height:660px; width: 100%;border:none;">
    </iframe>
    `;

		// calendarContainer.append(calendlyScript);
	});

	const userInfoElement = document.querySelectorAll('.userInfo');
	if (!userInfo) return;
	replaceInnerText(userInfoElement, userInfo, 'user.');
};

export default showCalendarToDOM;
