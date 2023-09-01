import add_search_auto_complete from './helpers/add_search_auto_complete';
import handle_icons_click from './helpers/handle_icon_clicks';
import select_element_by_promise from './helpers/selec_element_by_promise';

const google_maps_icons_container = document.createElement('div');
google_maps_icons_container.classList = '_d_h_b-maps-con';
google_maps_icons_container.innerHTML = `
<span style="font-size: 14px;color: #0c2d3f;font-weight: 500;line-height: 21px;">View Maps:</span>
<span id="zillow_button" style="display: inline-flex;align-items:center;justify-content:center;width: 24px;">
  <img style="max-width: 100%;width: 18px;height: 18px;border-radius:3px;cursor: pointer;margin-top: 2px"
   src="https://storage.googleapis.com/msgsndr/zY9uMzbEpJUrPPD0yfTL/media/64b7100af601aa83be46942e.webp"
   alt="zillow" />
</span>
<span id="maps_button" style="display: inline-flex;align-items:center;justify-content:center;width: 24px;">
  <img style="max-width: 100%;width: 20px;height: 20px;border-radius:3px;cursor: pointer;"
   src="https://storage.googleapis.com/msgsndr/zY9uMzbEpJUrPPD0yfTL/media/64b7100acb72ab364e9164b7.png"
   alt="Maps" />
</span>
<span id="street_button" style="display: inline-flex;align-items:center;justify-content:center;width: 24px;">
  <img style="max-width: 100%;width: 20px;height: 20px;border-radius:3px;cursor: pointer;"
   src="https://storage.googleapis.com/msgsndr/zY9uMzbEpJUrPPD0yfTL/media/64b7100aa55a527f9ab0a5f9.svg+xml"
   alt="Street view" />
</span>
`;

google_maps_icons_container.style = `
 position: absolute;
 width: 162px;
 height: 22px;
 right: 0;
 top: -2px;
 display: flex;
 align-items: center;
 gap: 5px;
`;

const zillow_button =
	google_maps_icons_container.querySelector('#zillow_button img');
const maps_button =
	google_maps_icons_container.querySelector('#maps_button img');
const street_button =
	google_maps_icons_container.querySelector('#street_button img');

zillow_button.addEventListener('click', handle_icons_click);
maps_button.addEventListener('click', handle_icons_click);
street_button.addEventListener('click', handle_icons_click);

async function handle_maps_icons_insert() {
	const stret_adress_con = await select_element_by_promise(
		'.hl_contact-details-left [id="contact.address1"]'
	);
	if (!stret_adress_con) return;
	stret_adress_con.style = `
	  position: relative !important;
	`;

	const street_adress_input = await select_element_by_promise(
		'.hl_contact-details-left input[name="contact.address1"]'
	);

	const city_input = await select_element_by_promise(
		".hl_contact-details-left input[name='contact.city']"
	);

	const state_input = await select_element_by_promise(
		".hl_contact-details-left input[name='contact.state']"
	);

	const postal_code_input = await select_element_by_promise(
		".hl_contact-details-left input[name='contact.postal_code']"
	);

	if (!street_adress_input || !city_input || !state_input || !postal_code_input)
		return;

	const adress_inputs = {
		street_adress_input: street_adress_input,
		city_input: city_input,
		state_input: state_input,
		postal_code_input: postal_code_input,
	};

	await add_search_auto_complete(adress_inputs);
	stret_adress_con.append(google_maps_icons_container);
}

function watch_document_change() {
	let timeout;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			const current_url = new URL(location.href);
			if (!current_url.pathname.includes('location')) return;
			if (google_maps_icons_container.isConnected) return;
			if (current_url.pathname.includes('/contacts/detail/')) {
				await handle_maps_icons_insert(current_url.pathname);
			}
		}, 500);
	};
}

async function main() {
	const main_wrapper = await select_element_by_promise('#app');
	if (!main_wrapper) return main();
	main_wrapper.addEventListener('DOMNodeInserted', watch_document_change());
}

main();
