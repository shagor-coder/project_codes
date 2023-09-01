let blogPerpage = 10;
let paginationItems = [];
let domPaginationItems = [];

const blogMain = document.querySelector('.blog-items');
const blogContainer = blogMain.querySelector('.blog-items .blog-row');
const blogs = [...blogMain.querySelectorAll('.blog-row .blog-item')];
const paginationContainer = document.querySelector('#pagination');

const customBlogContainer = document.createElement('div');
customBlogContainer.classList = `blog-row _church-blog-row`;

const dotsListOne = document.createElement('li');
const dotsListTwo = document.createElement('li');

function hideSubTexts(items = []) {
	items.forEach((i) => {
		const categoryText = i.querySelector('.blog-item-category');
		const dateTexts = i.querySelector('.blog-item-subtexts');
		categoryText ? (categoryText.style = 'display: none !important;') : null;
		dateTexts ? (dateTexts.style = 'display: none !important;') : null;
	});
}

function calculatePageNumbers(pageLimit = 0, items = []) {
	const numberOfPage = Math.ceil(items.length / pageLimit);
	return numberOfPage;
}

const pages = calculatePageNumbers(blogPerpage, blogs);

function showFixedNumberBlogs(items = []) {
	customBlogContainer.innerHTML = '';
	items.forEach((i) => {
		customBlogContainer.append(i);
	});
}

function createPaginationItem(number) {
	const paginationItem = document.createElement('li');
	paginationItem.dataset.page = number;
	paginationItem.innerHTML = number;
	if (number === 1) {
		paginationItem.classList.add('active');
	}
	return paginationItem;
}

function addRemoveActiveClass(items = []) {
	items.forEach((i) => {
		i.classList.remove('active');
	});
}

function calculateStartAndEndNumbers(currentNumber, totalPageNumber) {
	let startIndex;
	let endIndex;

	if (currentNumber === 1) {
		startIndex = 0;
		endIndex = blogPerpage;
	}

	if (currentNumber !== 1) startIndex = Number(currentNumber - 1) * blogPerpage;

	if (currentNumber !== totalPageNumber && currentNumber !== 1) {
		endIndex = Math.ceil(blogPerpage + Number(currentNumber - 1) * blogPerpage);
	}

	if (currentNumber === totalPageNumber) {
		endIndex = blogs.length;
	}

	return { startIndex, endIndex };
}

function handlePaginationClick(i, paginationItem) {
	const { startIndex, endIndex } = calculateStartAndEndNumbers(i, pages);
	let slicedBlogs = Array.from(blogs).slice(startIndex, endIndex);
	showFixedNumberBlogs(slicedBlogs);
	addRemoveActiveClass(paginationItems);
	paginationItem.classList.add('active');
	renderPagination(paginationItem);
}

function addEllipsisToPagination() {
	if (domPaginationItems.length < 4) return;

	const secondPagination = domPaginationItems[1];
	const secondLastPagination =
		domPaginationItems[domPaginationItems.length - 2];
	const lasPagination = domPaginationItems[domPaginationItems.length - 1];

	if (secondPagination.innerHTML.trim() !== '2') {
		dotsListOne.innerHTML = `...`;
		paginationContainer.insertBefore(dotsListOne, secondPagination);
	} else {
		dotsListOne.remove();
	}

	if (
		secondLastPagination.innerHTML.trim() !==
		Number(paginationItems.length - 1).toString()
	) {
		dotsListTwo.innerHTML = `...`;
		paginationContainer.insertBefore(dotsListTwo, lasPagination);
	} else {
		dotsListTwo.remove();
	}
}

function renderPagination(paginationItem) {
	domPaginationItems = [];
	let activeNextPaginationItems;

	const activeIndex = paginationItems.indexOf(paginationItem);

	if (activeIndex === 0) {
		activeNextPaginationItems = Array.from(paginationItems).slice(
			activeIndex,
			activeIndex + 4
		);
	}

	if (activeIndex === 1) {
		activeNextPaginationItems = Array.from(paginationItems).slice(
			activeIndex,
			activeIndex + 3
		);
	}

	if (activeIndex !== 0 && activeIndex !== 1) {
		activeNextPaginationItems = Array.from(paginationItems).slice(
			activeIndex - 1,
			activeIndex + 2
		);
	}

	if (activeIndex !== 0 && activeIndex === paginationItems.length - 1) {
		activeNextPaginationItems = Array.from(paginationItems).slice(
			activeIndex - 3,
			activeIndex + 2
		);
	}
	if (activeIndex !== 0 && activeIndex === paginationItems.length - 2) {
		activeNextPaginationItems = Array.from(paginationItems).slice(
			activeIndex - 2,
			activeIndex + 2
		);
	}

	paginationItems.forEach((i, index) => {
		if (index === 0)
			return paginationContainer.append(i), domPaginationItems.push(i);
		if (index === paginationItems.length - 1)
			return paginationContainer.append(i), domPaginationItems.push(i);
		if (activeNextPaginationItems.includes(i))
			return paginationContainer.append(i), domPaginationItems.push(i);
		i.remove();
	});

	addEllipsisToPagination();
}

function addPaginationToDom() {
	paginationItems = [];
	paginationContainer.innerHTML = '';
	for (let i = 1; i <= pages; i++) {
		const paginationItem = createPaginationItem(i);
		paginationItems.push(paginationItem);
		paginationItem.addEventListener('click', () => {
			handlePaginationClick(i, paginationItem);
		});
		paginationContainer.append(paginationItem);
	}
	renderPagination(paginationItems[0]);
}

function blogsFN() {
	if (!blogContainer) return console.log('No Blogs Here');
	blogMain.append(customBlogContainer);
	blogContainer.style = `display: none !important;`;
	addPaginationToDom();
	showFixedNumberBlogs(blogs.slice(0, blogPerpage));
	hideSubTexts(blogs);
}

blogsFN();
