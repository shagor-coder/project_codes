import { generate_calculator_elements } from './utils/calculator.html';
import { handle_next_button } from './utils/calculator.nexthandler';

const calculator = document.getElementById('calculator');

const next_button = document.createElement('button');
next_button.classList = `calculator_next_button`;
next_button.innerHTML = 'Next Step';
next_button.addEventListener('click', handle_next_button);

generate_calculator_elements(calculator);
calculator.append(next_button);
