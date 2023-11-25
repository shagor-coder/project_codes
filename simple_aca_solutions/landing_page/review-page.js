const data = {
	full_address: '',
	customer_id: 'pmHPMfG0SB412NAeKR94',
	id: 'pmHPMfG0SB412NAeKR94',
	full_name: 'md shagor hossain',
	name: 'md shagor hossain',
	first_name: 'Md Shagor',
	last_name: 'Hossain',
	email: 'msh43321@gmail.com',
	country: 'US',
	source: 'mortgage protection survey',
	phone: '+8801742677274',
	location_id: 'U4GYeRUTap2LryiowbHv',
	'3hgkMrnIap55Q5ZteWUQ': 27,
	your_age: 27,
	what_are_you_looking: 'Pay off mortgage balance',
	do_you_use_tobacco: 'No',
	are_you_employed_: 'No',
	verification_pin: '3761',
	i_was_found_not_eligible_for_medicaid_or_chip_in_the_last_90_days: 'Yes',
	do_you_have_a_doctor_you_would_like_to_keep: 'Yes',
	relationship_to_dependent_1: 'Stepparent',
	do_you_want_to_enroll_dependent_1: 'Yes',
	primary_applicants_social_security_number: '1111111111',
	do_you_have_a_spouse: 'Yes',
	do_you_have_any_dependents: 'Yes',
	dependent_1_full_legal_name: 'AAAAA',
	dependent_1_gender: 'Male',
	dependent_1_date_of_birth_mmddyyyy: 'aaaaaa',
	do_you_have_a_2nd_dependent: 'Yes',
	dr_name: 'Hello',
	RhNmgB6eUSi3hony3u2U: 'Jessore',
	dr_city: 'Jessore',
	dr_state: 'Jessore',
	do_you_want_us_to_enroll_your_spouse: 'Yes',
	relationship_to_dependent_2: 'Stepchild',
	relationship_to_dependent_3: 'Stepparent',
	relationship_to_dependent_4:
		'Brother or Sister (including half and step-siblings)',
	relationship_to_dependent_5: 'Stepparent',
	vVjq9p9JtvtY4axtwApx: 'Yes',
	do_you_want_to_enroll_dependent_2: 'Yes',
	do_you_want_to_enroll_dependent_3: 'Yes',
	do_you_want_to_enroll_dependent_4: 'Yes',
	do_you_want_to_enroll_dependent_5: 'No',
	spouse_legal_first_name: 'Md Shagor',
	spouse_legal_last_name: 'Hossain',
	spouses_date_of_birth_mmddyyyy: '11111',
	spouses_gender: 'Female',
	dependent_2_full_legal_name: 'AAAAAAAAA',
	dependent_2_gender: 'Male',
	dependent_2_date_of_birth_mmddyyyy: 'Aaaaaaaaaaaa',
	do_you_have_a_3rd_dependent: 'Yes',
	dependent_3_full_legal_name: 'aaaaaaaaaaa',
	dependent_3_gender: 'Male',
	dependent_3_date_of_birth_mmddyyyy: 'aaaaaaaaaaaa',
	do_you_have_a_4th_dependent: 'Yes',
	dependent_4_full_legal_name: 'vvvvvvvvvvv',
	dependent_4_gender: 'Female',
	dependent_4_date_of_birth_mmddyyyy: 'aaaaaaaaaaa',
	do_you_have_a_5th_dependent: 'Yes',
	dependent_5_full_legal_name: 'aaaaaaa',
	dependent_5_gender: 'Male',
	dependent_5_date_of_birth_mmddyyyy: 'qqqqqqqqqqqqqq',
	spouse_social_security_number: '11111111111',
	dependent_1_social_security_number: 'qqqqqqqqq',
	dependent_2_social_security_number: 'qqqqqqqqqq',
	dependent_3_social_security_number: 'qqqqqqqqqqqqq',
	dependent_4_social_security_number: 'qqqqqqqqqqqq',
};

const dataArray = [];

// Function to convert a key to a capitalized sentence
function keyToSentence(key) {
	// Remove underscores and capitalize the sentence
	return key.replace(/_/g, ' ').replace(/\w\S*/g, (text) => {
		return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
	});
}

// Iterate through the keys of the object
for (const key in data) {
	// Check if the key does not contain "id"
	if (!key.includes('id')) {
		// Generate a selector using the key
		const answer = `{{ contact.${key} }}`;
		// Convert the key to a capitalized sentence
		const question = keyToSentence(key);
		// Create an object with "selector" and "question" keys
		const obj = {
			answer,
			question,
		};
		// Add the object to the dataArray
		dataArray.push(obj);
	}
}

// Now, dataArray contains the desired array of objects
console.log(dataArray);

const reviewData = [
	{
		question: 'First Name',
		answer: 'first_name',
	},
	{
		question: 'Last Name',
		answer: 'last_name',
	},
	{
		question: 'Email',
		answer: 'email',
	},
	{
		question: 'Country',
		answer: 'country',
	},
	{
		question: 'Phone',
		answer: 'phone',
	},
	{
		question: 'Do You Use Tobacco',
		answer: 'do_you_use_tobacco',
	},
	{
		question: 'Are You Employed ',
		answer: 'are_you_employed_',
	},
	{
		question: 'Do You Have A Doctor You Would Like To Keep',
		answer: 'do_you_have_a_doctor_you_would_like_to_keep',
	},
	{
		question: 'Dr Name',
		answer: 'dr_name',
	},
	{
		question: 'Dr City',
		answer: 'dr_city',
	},
	{
		question: 'Dr State',
		answer: 'dr_state',
	},
	{
		question: 'Primary Applicants Social Security Number',
		answer: 'primary_applicants_social_security_number',
	},
	{
		question: 'Do You Have A Spouse',
		answer: 'do_you_have_a_spouse',
	},
	{
		question: 'Spouse Legal First Name',
		answer: 'spouse_legal_first_name',
	},
	{
		question: 'Spouse Legal Last Name',
		answer: 'spouse_legal_last_name',
	},
	{
		question: 'Spouses Date Of Birth Mmddyyyy',
		answer: 'spouses_date_of_birth_mmddyyyy',
	},
	{
		question: 'Spouses Gender',
		answer: 'spouses_gender',
	},
	{
		question: 'Do You Want Us To Enroll Your Spouse',
		answer: 'do_you_want_us_to_enroll_your_spouse',
	},
	{
		question: 'Spouse Social Security Number',
		answer: 'spouse_social_security_number',
	},
	{
		question: 'Do You Have Any Dependents',
		answer: 'do_you_have_any_dependents',
	},
	{
		question: 'Dependent 1 Full Legal Name',
		answer: 'dependent_1_full_legal_name',
	},
	{
		question: 'Dependent 1 Gender',
		answer: 'dependent_1_gender',
	},
	{
		question: 'Dependent 1 Date Of Birth Mmddyyyy',
		answer: 'dependent_1_date_of_birth_mmddyyyy',
	},
	{
		question: 'Relationship To Dependent 1',
		answer: 'relationship_to_dependent_1',
	},
	{
		question: 'Do You Want To Enroll Dependent 1',
		answer: 'do_you_want_to_enroll_dependent_1',
	},
	{
		question: 'Dependent 1 Social Security Number',
		answer: 'dependent_1_social_security_number',
	},
	{
		question: 'Do You Have A 2nd Dependent',
		answer: 'do_you_have_a_2nd_dependent',
	},
	{
		question: 'Dependent 2 Full Legal Name',
		answer: 'dependent_2_full_legal_name',
	},
	{
		question: 'Dependent 2 Gender',
		answer: 'dependent_2_gender',
	},
	{
		question: 'Dependent 2 Date Of Birth Mmddyyyy',
		answer: 'dependent_2_date_of_birth_mmddyyyy',
	},
	{
		question: 'Relationship To Dependent 2',
		answer: 'relationship_to_dependent_2',
	},
	{
		question: 'Do You Want To Enroll Dependent 2',
		answer: 'do_you_want_to_enroll_dependent_2',
	},
	{
		question: 'Dependent 2 Social Security Number',
		answer: 'dependent_2_social_security_number',
	},
	{
		question: 'Do You Have A 3rd Dependent',
		answer: 'do_you_have_a_3rd_dependent',
	},
	{
		question: 'Dependent 3 Full Legal Name',
		answer: 'dependent_3_full_legal_name',
	},
	{
		question: 'Dependent 3 Gender',
		answer: 'dependent_3_gender',
	},
	{
		question: 'Dependent 3 Date Of Birth Mmddyyyy',
		answer: 'dependent_3_date_of_birth_mmddyyyy',
	},
	{
		question: 'Relationship To Dependent 3',
		answer: 'relationship_to_dependent_3',
	},
	{
		question: 'Do You Want To Enroll Dependent 3',
		answer: 'do_you_want_to_enroll_dependent_3',
	},
	{
		question: 'Dependent 3 Social Security Number',
		answer: 'dependent_3_social_security_number',
	},
	{
		question: 'Do You Have A 4th Dependent',
		answer: 'do_you_have_a_4th_dependent',
	},
	{
		question: 'Dependent 4 Full Legal Name',
		answer: 'dependent_4_full_legal_name',
	},
	{
		question: 'Dependent 4 Gender',
		answer: 'dependent_4_gender',
	},
	{
		question: 'Dependent 4 Date Of Birth Mmddyyyy',
		answer: 'dependent_4_date_of_birth_mmddyyyy',
	},
	{
		question: 'Relationship To Dependent 4',
		answer: 'relationship_to_dependent_4',
	},
	{
		question: 'Do You Want To Enroll Dependent 4',
		answer: 'do_you_want_to_enroll_dependent_4',
	},
	{
		question: 'Dependent 4 Social Security Number',
		answer: 'dependent_4_social_security_number',
	},
	{
		question: 'Do You Have A 5th Dependent',
		answer: 'do_you_have_a_5th_dependent',
	},
	{
		question: 'Dependent 5 Full Legal Name',
		answer: 'dependent_5_full_legal_name',
	},
	{
		question: 'Dependent 5 Gender',
		answer: 'dependent_5_gender',
	},
	{
		question: 'Dependent 5 Date Of Birth Mmddyyyy',
		answer: 'dependent_5_date_of_birth_mmddyyyy',
	},
	{
		question: 'Relationship To Dependent 5',
		answer: 'relationship_to_dependent_5',
	},
	{
		question: 'Do You Want To Enroll Dependent 5',
		answer: 'do_you_want_to_enroll_dependent_5',
	},
	{
		question: 'Dependent 5 Social Security Number',
		answer: 'dependent_5_social_security_number',
	},
];

const questionAnswerCon = document.querySelector('#questions_answers');

function appendQuestionsAndAnswers(data, container) {
	const _ud = JSON.parse(localStorage.getItem('_ud'));
	data.forEach((item) => {
		const { answer, question } = item;
		if (!_ud[answer] || _ud[answer] === '') return console.log('No Answer');
		const qaDiv = document.createElement('div');
		qaDiv.className = 'question-answer';

		const questionDiv = document.createElement('h2');
		questionDiv.className = 'question';
		questionDiv.textContent = question;
		const answerDiv = document.createElement('p');
		answerDiv.className = 'answer';
		answerDiv.textContent = _ud[answer];

		qaDiv.appendChild(questionDiv);
		qaDiv.appendChild(answerDiv);
		container.appendChild(qaDiv);
	});
}

appendQuestionsAndAnswers(reviewData, questionAnswerCon);

function hideEmailField() {
	const _ud = JSON.parse(localStorage.getItem('_ud'));
	const emailField = document.querySelector("[data-q='email']");
	const e = new Event('input');
	e.initEvent('input', true, true);
	emailField.value = _ud.email ? _ud.email : '';
	emailField.dispatchEvent(e);
	emailField.parentElement.parentElement.style = `display: none !important`;
}

hideEmailField();
