const preview_container = document.querySelector('#preview-container');

const mutation_config = {
	subtree: true,
	childList: true,
};

const mutation_observer = new MutationObserver(check_popup_insert(500));

function wait(wait) {
	return new Promise((res, rej) => {
		setTimeout(() => {
			res(true);
		}, wait);
	});
}

let timeout_id = null;

function check_popup_insert(timeout) {
	return () => {
		clearTimeout(timeout_id);
		timeout_id = setTimeout(async () => {
			const overlay = document.querySelector('#overlay');
			if (!overlay) return console.log('no overlay');
			await wait(500);
			l();
			mutation_observer.disconnect();
		}, timeout);
	};
}

setTimeout(() => {
	mutation_observer.observe(preview_container.parentElement, mutation_config);
}, 1500);
