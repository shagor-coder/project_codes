const categoryMain_dates = document.querySelector(
	'#category-navigation-3yhRmL75GS'
);
const categoryNav_dates = categoryMain_dates.querySelector(
	'.category-navigation'
);
const categoryContainer_dates = categoryMain_dates.querySelector('.categories');

const allCategoryLink_dates = [
	...categoryMain_dates.querySelectorAll('.hl-category-nav-menu-text'),
];

const customCategoryContainer_dates = document.createElement('div');
customCategoryContainer_dates.classList = `_church-category-container`;

const categorySelect_dates = document.createElement('select');

categorySelect_dates.addEventListener('change', (e) => {
	e.preventDefault();
	const selectedOption = e.target.options[e.target.selectedIndex];
	const link = selectedOption.link;
	link.click();
});

function createCategoryOption(item) {
	const option = document.createElement('option');
	option.value = item.textContent.trim();
	option.link = item;
	option.innerHTML = item.innerText.trim();
	return option;
}

function appendCategoryOptions() {
	allCategoryLink_dates.forEach((l) => {
		const option = createCategoryOption(l);
		categorySelect_dates.append(option);
	});

	customCategoryContainer_dates.append(categorySelect_dates);
	categoryNav_dates.append(customCategoryContainer_dates);
	selectCurrentCategory(categorySelect_dates);
}

function selectCurrentCategory(select) {
	const url = new URL(location.href);
	const pathname = url.pathname;
	const options = [...select.querySelectorAll('option')];
	const optionTexts = options.map((o) => {
		const obj = {};
		obj.name = o.innerHTML.toString().trim().toLowerCase().split(' ');
		obj.el = o;
		return obj;
	});

	const currentMonthAbbreviation = extractMonth(pathname.split('/c/')[1]);

	const currentOption = optionTexts.find((ot) => {
		return ot.name.find(
			(n) =>
				n.split(' ')[0].toLowerCase() ===
				currentMonthAbbreviation.trim().toLowerCase()
		);
	});

	if (!currentOption) return console.log('Event Home Page!!');

	select.value = currentOption.el.innerText;
}

function extractMonth(inputString) {
	const monthRegex = /^(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i;
	const match = inputString.match(monthRegex);
	return match ? match[0].toLowerCase() : null;
}

function categoryFNDate() {
	if (!categoryMain_dates) return console.log('There is no category');
	categoryContainer_dates.style = `display: none !important;`;
	appendCategoryOptions();
}

categoryFNDate();
