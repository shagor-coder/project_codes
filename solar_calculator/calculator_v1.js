const solarDetails = {
	unitPrice: 1800,
	federalTax: 0.3,
	kwhBase: 3.33,
	systemBase: 0.0096,
};

const getLocalStorage = (key) => {
	const data = JSON.parse(localStorage.getItem(key));
	if (!data) return {};
	return data;
};

let calculatedResutls = {
	khwUseInMonth: 0,
	solarEnergyCost: 0,
	federalTaxCredit: 0,
	AZSolarTaxCredit: 1000,
	netCost: 0,
	paybackInYears: 0,
	_20YearsSavings: 0,
	systemSize: 0,
	yearlySavings: 0,
	_10YearsSavings: 0,
};

const solarEnergyCostEl = document.querySelector('.solar_energy_cost');
const federalTaxCreditEl = document.querySelector('.federal_tax_credit');
const AZSolarTaxCreditEl = document.querySelector('.az_solar_tax_credit');

const netCostEl = document.querySelector('.solar_net_cost');

const paybackInYearsEl = document.querySelector('.payback_in_years');
const _20YearsSavingsEl = document.querySelector('._20_years_savings');

const systemSizeEl = document.querySelector('.system_size');
const yearlySavingsEl = document.querySelector('.yearly_savings');
const _10YearsSavingsEl = document.querySelector('._10_years_savings');

const calculateData = () => {
	const data = getLocalStorage('_ud');
	if (!data.id) return;
	const { monthly_bill } = data;

	let {
		khwUseInMonth,
		solarEnergyCost,
		federalTaxCredit,
		AZSolarTaxCredit,
		netCost,
		paybackInYears,
		_20YearsSavings,
		systemSize,
		yearlySavings,
		_10YearsSavings,
	} = calculatedResutls;

	khwUseInMonth = parseFloat(
		Number(monthly_bill * solarDetails.kwhBase)
	).toFixed(2);
	systemSize = parseFloat(khwUseInMonth * solarDetails.systemBase).toFixed(2);
	solarEnergyCost = parseFloat(
		Number(systemSize / 0.275) * solarDetails.unitPrice
	).toFixed(2);
	federalTaxCredit = parseFloat(
		solarEnergyCost * solarDetails.federalTax
	).toFixed(2);

	const netTaxCredit = parseFloat(
		Number(AZSolarTaxCredit) + Number(federalTaxCredit)
	).toFixed(2);

	netCost = solarEnergyCost - netTaxCredit;

	solarEnergyCostEl.innerText = '$' + solarEnergyCost;
	systemSizeEl.innerText = systemSize + 'kWh';
	federalTaxCreditEl.innerText = '$' + federalTaxCredit;
	AZSolarTaxCreditEl.innerText = '$' + AZSolarTaxCredit;
	netCostEl.innerText = '$' + parseFloat(netCost).toFixed(2);
};

calculateData();
