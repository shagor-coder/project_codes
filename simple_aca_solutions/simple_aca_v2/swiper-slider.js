const swiper_pagination_el = document.createElement('div');
swiper_pagination_el.classList = 'swiper-pagination';

function remove_ghl_classes() {
	const swiper_row = document.querySelector('.swiper');

	const swiper_row_inner = swiper_row.querySelector('.inner');
	swiper_row_inner.classList = '';
	swiper_row_inner.classList = 'swiper-wrapper';

	const swiper_columns = [...swiper_row.querySelectorAll('.c-column')];

	swiper_columns.forEach((sc) => {
		sc.classList = '';
		sc.classList = 'swiper-slide';
		const swiper_columns_inner = sc.querySelector('.inner');
		swiper_columns_inner.classList = '';
	});

	swiper_row.append(swiper_pagination_el);
}

remove_ghl_classes();

const swiper = new Swiper('.swiper', {
	autoplay: {
		delay: 3000,
		disableOnInteraction: false,
	},
	slidesPerView: 'auto',
	spaceBetween: 30,
	loop: true,
	pagination: {
		el: '.swiper-pagination',
	},
});
