import handle_auto_save from './handle_auto_save';
import update_adress_inputs from './update_adress_input';

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

export default add_search_auto_complete;
