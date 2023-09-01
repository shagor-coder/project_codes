const categoryMain = document.querySelector('#category-navigation-KNwtuZglcg');
const categoryNav = categoryMain.querySelector('.category-navigation');
const categoryContainer = categoryMain.querySelector('.categories');

const allCategoryLink = [
	...categoryMain.querySelectorAll('.hl-category-nav-menu-text'),
];

const customCategoryContainer = document.createElement('div');
customCategoryContainer.classList = `_church-category-container`;

const categorySelect = document.createElement('select');

categorySelect.addEventListener('change', (e) => {
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
	allCategoryLink.forEach((l) => {
		const option = createCategoryOption(l);
		categorySelect.append(option);
	});

	customCategoryContainer.append(categorySelect);
	categoryNav.append(customCategoryContainer);
	selectCurrentCategory(categorySelect);
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
	const currentOption = optionTexts.find((ot) => {
		return ot.name.find((n) => pathname.split('/c/')[1] === n);
	});
	if (!currentOption) return console.log('Event Home Page!!');
	select.value = currentOption.el.innerText;
}

function categoryFN() {
	if (!categoryMain) return console.log('There is no category');
	categoryContainer.style = `display: none !important;`;
	appendCategoryOptions();
}

categoryFN();
