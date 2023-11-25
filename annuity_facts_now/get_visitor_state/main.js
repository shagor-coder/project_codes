import get_ip_data from './utils/get_ip_data';
import hide_input_field from './utils/hide_input_field';
import update_input_field from './utils/update_input_field';

const ip_input_field = document.querySelector('[data-q="ip_look_up"]');
const state_input_field = document.querySelector('[data-q="ip_state"]');

async function main() {
	hide_input_field(ip_input_field);
	hide_input_field(state_input_field);

	try {
		const ip_data = await get_ip_data();
		const { ip, region } = ip_data;
		update_input_field(ip_input_field, ip);
		update_input_field(state_input_field, region ? region : 'N/A');
	} catch (error) {
		throw new Error(error);
	}
}

main();
