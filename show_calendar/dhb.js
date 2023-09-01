const google_maps_icons_container = document.createElement('div');
google_maps_icons_container.classList = '_d_h_b-maps-con';
google_maps_icons_container.innerHTML = `
<span style="font-size: 14px;color: #0c2d3f;font-weight: 500;line-height: 21px;">View Maps:</span>
<span id="zillow_button" style="display: inline-flex;align-items:center;justify-content:center;width: 24px;">
  <img style="max-width: 100%;width: 20px;height: 20px;border-radius:3px;cursor: pointer;"
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
 height: 20px;
 right: 0;
 top: 0px;
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

function select_element_by_promise(selectorClass = '', type = '') {
	return new Promise((res, rej) => {
		let element = null;
		let timeout;
		timeout = setInterval(() => {
			if (type === 'multi') {
				element = document.querySelectorAll(selectorClass);
			} else {
				element = document.querySelector(selectorClass);
			}

			if (!element) return;
			clearInterval(timeout);
			res(element);
		}, 300);

		setTimeout(() => {
			if (!element) {
				clearInterval(timeout);
				res(false);
			}
		}, 10000);
	});
}

async function handle_icons_click(e) {
	console.log(e);

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
		return console.log('Elements Not Available!');

	const full_adress = `${street_adress_input.value} ${city_input.value} ${state_input.value} ${postal_code_input.value}`;

	if (e.target.id.trim() === 'zillow_button') {
		const z_link = 'https://www.zillow.com/homes/' + full_adress;
		window.open(z_link, '_blank');
	}
	if (e.target.id.trim() === 'maps_button') {
		const maps_link = 'https://google.com/maps/search/' + full_adress;
		window.open(maps_link, '_blank');
	}
	if (e.target.id.trim() === 'street_button') {
		const street_link =
			'https://maps.googleapis.com/maps/api/streetview?size=640x300&key=AIzaSyBSRTF41cLVeP1vjQoED-zY3nwp6eF0qyA&location=' +
			full_adress;
		window.open(street_link, '_blank');
	}
}

function update_adress_inputs(input, value) {
	const ev = new Event('input');
	input.value = value;
	ev.initEvent('input', true);
	input.dispatchEvent(ev);
}

async function handle_auto_save() {
	const save_button = await select_element_by_promise(
		'.form-footer.save button.bg-apple-500'
	);
	if (!save_button) return;

	save_button.click();
}

async function add_search_auto_complete(adress_inputs = {}) {
	const { street_adress_input, city_input, state_input, postal_code_input } =
		adress_inputs;

	const autocomplete = new google.maps.places.Autocomplete(
		street_adress_input,
		{
			componentRestrictions: { country: 'us' },
			fields: ['address_components', 'geometry', 'name'],
			types: ['address'],
		}
	);
	autocomplete.addListener('place_changed', async () => {
		const places = autocomplete.getPlace();
		const { address_components, name } = places;

		const street_adress = name;
		const city_obj = address_components.find((ac) => {
			return ac.types.includes('locality') && ac.types.includes('political');
		});
		const state_obj = address_components.find((ac) => {
			return ac.types.includes('administrative_area_level_1');
		});
		const postal_code_obj = address_components.find((ac) => {
			return ac.types.includes('postal_code');
		});

		update_adress_inputs(street_adress_input, street_adress);
		update_adress_inputs(city_input, city_obj && city_obj.short_name);
		update_adress_inputs(state_input, state_obj && state_obj.short_name);
		update_adress_inputs(
			postal_code_input,
			postal_code_obj && postal_code_obj.short_name
		);
		const event = new Event('blur');
		street_adress_input.dispatchEvent(event);

		await handle_auto_save();
	});
}

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

let previous_url;

function watch_document_change() {
	let timeout;
	return () => {
		clearTimeout(timeout);
		timeout = setTimeout(async () => {
			const current_url = new URL(location.href);
			if (!current_url.pathname.includes('location'))
				return console.log('agency client');

			if (google_maps_icons_container.isConnected) return;
			//if (previous_url === current_url.pathname) return;
			if (current_url.pathname.includes('/contacts/detail/')) {
				await handle_maps_icons_insert(current_url.pathname);
			}
			previous_url = current_url.pathname;
		}, 500);
	};
}

async function main() {
	const main_wrapper = await select_element_by_promise('#app');
	if (!main_wrapper) return main();
	main_wrapper.addEventListener('DOMNodeInserted', watch_document_change());
}
main();
