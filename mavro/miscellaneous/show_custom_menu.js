const menusArray = [
	{
		name: '1. FFM Certification',
		link: 'https://www.cms.gov/files/document/plan-year-2023-health-insurance-marketplace-registration-and-training-new-agents-and-brokers.pdf',
	},
	{
		name: '2. Carrier Contracting',
		link: 'https://docs.google.com/forms/d/e/1FAIpQLSdG3YIudK7-ExTDuux9zmlXFxiNdZUwRsgUB4hsra2aPD2w8A/viewform',
	},
	{
		name: '3. Create a Health Sherpa account',
		link: 'https://www.healthsherpa.com/agents/features?_referring_agent_id=jeffrey-goodrich&_agent_id=jeffrey-goodrich',
	},
	{
		name: '4. Income Levels Per State',
		link: 'https://docs.google.com/spreadsheets/d/1H4brYelDIlOUUTAi7ABIKGTnCy7uJGlmib3JVSuoxEw/edit#gid=0',
	},
	{
		name: '5. Federal Exchange States',
		link: 'https://www.kff.org/health-reform/state-indicator/state-health-insurance-marketplace-types/?currentTimeframe=0&sortModel=%7B%22colId%22:%22Location%22,%22sort%22:%22asc%22%7D',
	},
	{
		name: '6. Expanded medicaid',
		link: 'https://www.kff.org/medicaid/issue-brief/status-of-state-medicaid-expansion-decisions-interactive-map/',
	},
	{
		name: '7. Ambetter $500 Visa Rewards Card',
		link: 'https://ambetter.superiorhealthplan.com/health-plans/my-health-pays.html',
	},
];

function returnDomElementByPromise(selectorClass = '', type = '') {
	return new Promise((res, rej) => {
		let element = null;
		let timeout;
		timeout = setInterval(() => {
			if (type === 'multi') {
				element = document.querySelectorAll(selectorClass);
			} else {
				element = document.querySelector(selectorClass);
			}

			if (!element) return;
			clearInterval(timeout);
			res(element);
		}, 300);

		setTimeout(() => {
			if (!element) {
				clearInterval(timeout);
				res(false);
			}
		}, 10000);
	});
}

const customDropdownCon = document.createElement('div');
customDropdownCon.classList =
	'w-full group px-3 flex items-center justify-start sm:justify-center md:justify-center lg:justify-start xl:justify-start text-sm font-medium rounded-md cursor-pointer font-medium opacity-70 hover:opacity-100 py-2 md:py-2';
customDropdownCon.innerHTML = `
    <img src="https://storage.googleapis.com/highlevel-backend.appspot.com/sidebar-v2/memberships.svg" class="md:mr-0 h-5 w-5 mr-2 lg:mr-2 xl:mr-2">
    <span class="hl_text-overflow sm:hidden md:hidden nav-title lg:block xl:block">ACA staff</span>`;

const dropdownMain = document.createElement('div');

async function createCustomDropdown(elements = []) {
	dropdownMain.innerHTML = '';
	elements.forEach((el) => {
		const link = document.createElement('a');
		link.classList = `_aca-dropdown-link`;
		link.innerHTML = el.name;
		link.href = el.link;

		link.target = '_blank';

		dropdownMain.append(link);
	});
}

async function handleMenuInsert(pathname) {
	if (customDropdownCon.isConnected) return;

	const automation = await returnDomElementByPromise('#sb_automation');
	if (!automation) return console.log('No automation found!!');
	automation.parentElement.insertBefore(customDropdownCon, automation);
	await createCustomDropdown(menusArray);
	customDropdownCon.append(dropdownMain);
}

let prevLocation;

function handleDomInsert() {
	let timeout;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			const currentURL = new URL(location.href);
			if (!currentURL.pathname.includes('location'))
				return console.log('agency client');

			if (currentURL.pathname.includes('/settings/'))
				return console.log('setting client');

			if (!customDropdownCon.isConnected)
				await handleMenuInsert(currentURL.pathname);

			if (prevLocation === currentURL.pathname) return;
			await handleMenuInsert(currentURL.pathname);
			prevLocation = currentURL.pathname;
			console.log('FN called!!');
		}, 500);
	};
}

const sidebar = document.querySelector('#app');
sidebar.addEventListener('DOMNodeInserted', handleDomInsert());
