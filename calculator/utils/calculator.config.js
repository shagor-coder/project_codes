export const config = {
	step_1: {
		name: 'Your Info',
		fields: [
			{
				field_type: 'text',
				label: 'Full Name',
				field_key: 'full_name',
			},
			{
				field_type: 'text',
				label: 'Email',
				field_key: 'email',
			},
			{
				field_type: 'text',
				label: 'Phone',
				field_key: 'phone',
			},
			{
				field_type: 'text',
				label: 'Address',
				field_key: 'full_address',
			},
		],
	},
	step_2: {
		name: 'Pre-Assessment Check',
		fields: [
			{
				field_type: 'select',
				label: "What's the type of the area?",
				field_key: 'whats_the_type_of_the_area',
				options: ['Residential', 'Commercial'],
			},
			{
				field_type: 'select',
				label: "What's the angle of your roof?",
				field_key: 'whats_the_angle_of_your_roof',
				options: ['Slope', 'Flat'],
			},
			{
				field_type: 'select',
				label: "What's the material of your roof??",
				field_key: 'whats_the_material_of_your_roof',
				options: ['Metal', 'Brick', 'Stone', 'Slate'],
			},
			{
				field_type: 'select',
				label: 'How shaded is your area?',
				field_key: 'how_shaded_is_your_area',
				options: ['None', 'Light', 'Heavy'],
			},
			{
				field_type: 'select',
				label: "What's your payment plan?",
				field_key: 'whats_your_payment_plan',
				options: ['Financing', 'Cash'],
			},
		],
	},
	step_3: {
		name: 'Your Energy Consumption',
		fields: [
			{
				field_type: 'range',
				label: 'Your avg kW Consumption.',
				field_key: 'your_avg_kw_consumtion',
				min: 100,
				max: 3000,
				step: 5,
			},
			{
				field_type: 'range',
				label: 'Your avg monthly bill.',
				field_key: 'your_avg_monthly_bill',
				min: 50,
				max: 1000,
				step: 5,
			},
		],
	},
};
