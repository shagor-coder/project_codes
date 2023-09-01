function changeBackBtn() {
	const backBtn = document.querySelector('.blog-back-button');
	if (!backBtn) return console.log('Not Single Blog!!!');

	const span = backBtn.querySelector('span');

	if (!span) return;

	span.innerText = 'Back To Events';
}

changeBackBtn();
