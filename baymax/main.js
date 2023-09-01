import {
	createCallBackName,
	createTargetStates,
	createAdditionalInfo,
} from './utils/createInputs';
import returnElementByClass from './utils/getElementWithPromise';

async function getGHLForm() {
	const ghlForm = await returnElementByClass('._ghl-order-form');
	if (!ghlForm) return;

	const info = ghlForm[0].querySelector('.info');
	if (!info) return;

	const formBtns = await returnElementByClass('.form-btn');
	if (!formBtns.length) return;

	formBtns?.forEach((btn) => {
		btn.style.opacity = '0.5';
		btn.style.pointerEvents = 'none';
	});

	const callBackInput = createCallBackName(formBtns);
	const statesCon = createTargetStates(formBtns);
	const additionalInfoInput = createAdditionalInfo(formBtns);
	info.append(callBackInput);
	info.append(statesCon);
	info.append(additionalInfoInput);
}

getGHLForm();
