import { config } from './calculator.config';
import { step_els } from './calculator.html';
const step_count = document.querySelector('.step-count');
const step_name = document.querySelector('.step-name');

export let active_step = 0;

export const handle_next_button = () => {
	if (active_step + 1 === step_els.length) return console.log('Submit');

	active_step++;

	step_els.forEach((step_el) => {
		step_el.classList.add('hidden');
	});

	step_els[active_step].classList.remove('hidden');
	step_count.textContent = `Step ${active_step + 1}`;
	const step_key = `step_${active_step + 1}`;
	step_name.textContent = config[step_key].name;
};
