import create from 'zustand';

const sheetURL =
	'https://script.google.com/macros/s/AKfycbyZDmeQWr6HPtTtRuV6n-kzkRxA2Qa7x873Pxz2SaEfLMo4QoOoJvJFc10MwJePD99f/exec?';

const useStore = create((set) => ({
	company: null,
	properties: null,
	contacts: null,
	isLoading: true,
	isError: false,
	fetchData: async () => {
		try {
			const responsePromises = [
				fetch(sheetURL + 'sheet=0').then((res) => res.json()),
				fetch(sheetURL + 'sheet=1').then((res) => res.json()),
				fetch(sheetURL + 'sheet=2').then((res) => res.json()),
			];

			const [companyResponse, propertiesResponse, contactsResponse] =
				await Promise.all(responsePromises);

			const company = companyResponse.data;
			const properties = propertiesResponse.data;
			const contacts = contactsResponse.data;

			set({ company, properties, contacts, isLoading: false }); // Updated to assign data array to keys
		} catch (error) {
			console.error('Error fetching data:', error);
		}
	},
}));

export default useStore;
