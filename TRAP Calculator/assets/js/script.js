function main() {
	const dataStore = {
		buyingPower: '',
		planToSell: '',
		putProfitBack: '',
		netProfitRange: '25',
	};

	let dataTable = [];

	let totalProfit = 0;
	let totalReinvestment = 0;

	let monthlyProfit = 0;
	let newBuyingPower = 0;
	let totalSales = 0;

	const calculatorForm = document.querySelector('#calculator');

	const inputElements = [...calculatorForm.querySelectorAll('input[name]')];
	const calculateButton = calculatorForm.querySelector('#calculate');
	const percentText = calculatorForm.querySelector('#currentTarget');

	inputElements.forEach((input) => {
		if (input.type === 'RADIO') {
			input.addEventListener('click', () => {
				dataStore[input.name] = input.value.trim();
			});
		} else {
			input.addEventListener('input', () => {
				dataStore[input.name] = input.value.trim();
				percentText.textContent = dataStore.netProfitRange + '%';
			});
		}
	});

	const months = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	function showDataTable(data = [], type) {
		const dataTableContainer = document.querySelector('#dataTable');
		dataTableContainer.innerHTML = `
      <h2>Monthly Financial Data</h2>
      <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th></th>
                                    <th>Old Buying Power</th>
                                    <th>${
																			type === 'profit' ? 'Profit' : 'Loss'
																		}</th>
                                    <th>Reinvest</th>
                                    <th>New Buying Power</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr data-index="0">
                                    <td>January</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="1">
                                    <td>February</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="2">
                                    <td>March</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="3">
                                    <td>April</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="4">
                                    <td>May</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="5">
                                    <td>June</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="6">
                                    <td>July</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="7">
                                    <td>August</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="8">
                                    <td>September</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="9">
                                    <td>October</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="10">
                                    <td>November</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr data-index="11">
                                    <td>December</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
    `;
		const tbody = dataTableContainer.querySelector('tbody');

		data.forEach((table, index) => {
			let dataIndex = 0;
			if (data.length === 6) {
				if (index === 0) {
					dataIndex = index;
				} else if (index === 1) {
					dataIndex = 2;
				} else if (index === 2) {
					dataIndex = 4;
				} else if (index === 3) {
					dataIndex = 6;
				} else if (index === 4) {
					dataIndex = 8;
				} else if (index === 5) {
					dataIndex = 10;
				}
			} else if (data.length === 12) {
				dataIndex = index;
			}
			tbody.querySelector(`[data-index="${dataIndex}"]`).innerHTML = `
                 <td>${months[dataIndex]}</td>
                 <td>$${table.buyingPower}</td>
                 <td>$${table.profit}</td>
                 <td>$${table.reinvestment}</td>
                 <td>$${table.newBuyingPower}</td>
        `;
		});

		const lastTr = document.createElement('tr');
		lastTr.innerHTML = `
                 <td>T</td>
                 <td></td>
                 <td>$${totalProfit}</td>
                 <td>$${totalReinvestment}</td>
                 <td></td>
        `;

		tbody.append(lastTr);
	}

	function showResult(type) {
		const resultContainer = document.querySelector('#calculated-result');
		resultContainer.innerHTML = `
      <h2>Monthly Financial Data</h2>
      <div class="mx-auto">
                    <table class="table table-striped">
                        <thead>
                            <tr>
                                <th>Monthly ${
																	type === 'profit' ? 'Profit' : 'Loss'
																}</th>
                                <th>New Buying Power</th>
                                <th>Total Sales</th>
                                <th>Total ${
																	type === 'profit' ? 'Profit' : 'Loss'
																}</th>
                                <th>Total Reinvestment</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>$${monthlyProfit}</td>
                                <td>$${newBuyingPower}</td>
                                <td>$${totalSales}</td>
                                <td>$${totalProfit}</td>
                                <td>$${totalReinvestment}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
    `;
	}

	function calculateResults(data, targetProfit, type) {
		totalProfit = 0;
		totalReinvestment = 0;
		data.forEach((table) => {
			totalProfit = totalProfit + table.profit;
			totalReinvestment = totalReinvestment + table.reinvestment;
		});

		monthlyProfit = Math.round(totalProfit / 12);
		newBuyingPower = Math.round(data[data.length - 1].newBuyingPower);
		totalSales = Math.round(totalProfit / targetProfit);

		console.log(
			monthlyProfit,
			totalProfit,
			totalReinvestment,
			newBuyingPower,
			totalSales
		);
		showResult(type);
		showDataTable(dataTable, type);
	}

	function calculateRetuernIfNegetive(inputData) {
		const { buyingPower, targetLoss, numberOfTimes } = inputData;

		let currentBuyingPower = buyingPower;
		let currentLoss = Math.round(currentBuyingPower * targetLoss);
		let reinvestment = 0;
		let newBuyingPower = currentBuyingPower - currentLoss;

		console.log(currentLoss);

		const monthValue = {
			buyingPower: currentBuyingPower,
			profit: currentLoss,
			reinvestment: reinvestment,
			newBuyingPower: newBuyingPower,
		};

		dataTable.push(monthValue);

		for (let i = 0; i < numberOfTimes; i++) {
			if (i !== 0) {
				const previousData = dataTable[Number(i - 1)];
				currentBuyingPower = previousData.newBuyingPower;
				currentLoss = Math.round(currentBuyingPower * targetLoss);
				reinvestment = 0;
				newBuyingPower = currentBuyingPower - currentLoss;

				const monthValue = {
					buyingPower: Math.round(currentBuyingPower),
					profit: Math.round(currentLoss),
					reinvestment: Math.round(reinvestment),
					newBuyingPower: Math.round(newBuyingPower),
				};

				dataTable.push(monthValue);
			}
		}

		calculateResults(dataTable, targetLoss, 'loss');
	}

	function calculateReturnIfPositive(inputData) {
		const { buyingPower, reinvestmentRate, targetProfit, numberOfTimes } =
			inputData;

		let currentBuyingPower = buyingPower;
		let currentProfit = currentBuyingPower * targetProfit;
		let reinvestment = currentProfit * reinvestmentRate;
		let newBuyingPower = currentBuyingPower + reinvestment;

		console.log(targetProfit);

		const monthValue = {
			buyingPower: currentBuyingPower,
			profit: currentProfit,
			reinvestment: reinvestment,
			newBuyingPower: newBuyingPower,
		};

		dataTable.push(monthValue);

		for (let i = 0; i < numberOfTimes; i++) {
			if (i !== 0) {
				const previousData = dataTable[Number(i - 1)];
				currentBuyingPower = previousData.newBuyingPower;
				currentProfit = currentBuyingPower * targetProfit;
				reinvestment = currentProfit * reinvestmentRate;
				newBuyingPower = currentBuyingPower + reinvestment;

				const monthValue = {
					buyingPower: Math.round(currentBuyingPower),
					profit: Math.round(currentProfit),
					reinvestment: Math.round(reinvestment),
					newBuyingPower: Math.round(newBuyingPower),
				};

				dataTable.push(monthValue);
			}
		}

		calculateResults(dataTable, targetProfit, 'profit');
	}

	function main() {
		dataTable = [];
		let target =
			dataStore.netProfitRange.replace('-', '').length === 2
				? '0.' + Math.abs(dataStore.netProfitRange)
				: '0.0' + Math.abs(dataStore.netProfitRange);

		let buyingPower = Number(dataStore.buyingPower);
		const numberOfTimes = Number(12 * dataStore.planToSell);

		const reinvestmentRate = Number(dataStore.putProfitBack);

		if (Number(dataStore.netProfitRange) < 1) {
			let targetLoss = target;
			calculateRetuernIfNegetive({
				buyingPower,
				targetLoss,
				numberOfTimes,
				reinvestmentRate,
			});
		} else {
			let targetProfit = target;
			calculateReturnIfPositive({
				buyingPower,
				targetProfit,
				numberOfTimes,
				reinvestmentRate,
			});
		}
	}

	calculateButton.addEventListener('click', main);
}

export default main;
