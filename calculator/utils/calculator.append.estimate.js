import { config } from "./calculator.config";
import { calculator_data } from "./calculator.data";
const { cost_per_watt, labour, panel_cost, panel_rating } =
  config.calculation_values;

let calculated_data = {
  savings: 0,
  kw: 0,
  panels: 0,
  system_cost: 0,
  incentive: 0,
};

let number_format = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const create_estimate_values = (name, offset, element) => {
  let result;

  switch (name) {
    case "saving_text":
      result =
        parseFloat(
          calculator_data.step_3.your_avg_monthly_bill.replace("$", "") / 100
        ).toFixed(2) *
        100 *
        offset;
      element.textContent = number_format.format(Math.round(result));
      calculated_data.savings = result;
      break;

    case "system_text":
      result =
        parseFloat(
          calculator_data.step_3.your_avg_kw_consumtion.replace("kWH", "") / 31
        ).toFixed(2) * offset;

      element.textContent = Math.round(result) + "kW";
      calculated_data.kw = result;
      break;

    case "panels_text":
      result = (calculated_data.kw * 1000) / panel_rating;
      element.textContent = Math.round(result);
      calculated_data.panels = result;
      break;

    case "incentive_text":
      result = calculated_data.panels * panel_cost;
      result = result * labour;
      calculated_data.system_cost = result;
      result = result * 0.3;
      element.textContent = number_format.format(Math.round(result));
      break;

    case "total_text":
      result = calculated_data.system_cost - calculated_data.incentive;

      element.textContent = number_format.format(Math.round(result));
      break;
    default:
      break;
  }
};

const estimate_div = document.createElement("div");
estimate_div.classList = `calculator_estimate_div`;

export const append_cost_estimates = (step, utility_offset) => {
  estimate_div.innerHTML = `
    <div class="calculator_estimate_cards">
      <div class="estimate_card">
        <h4>
          <span>Monthly Saving with Solar</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">Has a monthly offset of ${
            100 * utility_offset
          }%</span>
          </div>
        </h4>
        <span class="estimate_value" id="saving_text"></span>
      </div>
      <div class="estimate_card">
        <h4>
          <span>Suggested System Size</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">The ideal system you need.</span>
          </div>
        </h4>
        <span class="estimate_value" id="system_text"></span>
      </div>
      <div class="estimate_card">
        <h4>
          <span>Suggested No. of Panels</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">Number of panels you need.</span>
          </div>
        </h4>
        <span class="estimate_value" id="panels_text"></span>
      </div>
      <div class="estimate_card">
        <h4>
          <span>Federal Tax Credit Incentives (30%)</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">Number of panels you need.</span>
          </div>
        </h4>
        <span class="estimate_value" id="incentive_text"></span>
      </div>
    </div>

    <div class="calculator_total_cost">
      <h4>
          <span>Total System Cost.</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">Total cost to install this system.</span>
          </div>
        </h4>
        <span class="estimate_value" id="total_text"></span>
    </div>

    <div class="calculator_savings_panel">
      <div>
        <h4>
          <span>Yearly Savings.</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">Amount of money you can save yearly by installing this system.</span>
          </div>
        </h4>
        <span class="estimate_value" id="yearly_text">-</span>
      </div>
      <div>
        <h4>
          <span>Financing.</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">You can take a loan for this.</span>
          </div>
        </h4>
        <span class="estimate_value" id="financing_text">Loan</span>
      </div>
      <div>
        <h4>
          <span>Payback in Years.</span>
          <div class="tooltip">
          <i class="fa-regular fa-circle-question"></i>
          <span class="tooltip_text">Total years in payback.</span>
          </div>
        </h4>
        <span class="estimate_value" id="payback_text">-</span>
      </div>
    </div>
  `;

  const saving_text = estimate_div.querySelector("#saving_text");
  const system_text = estimate_div.querySelector("#system_text");
  const panels_text = estimate_div.querySelector("#panels_text");
  const incentive_text = estimate_div.querySelector("#incentive_text");
  const total_text_text = estimate_div.querySelector("#total_text");

  create_estimate_values("saving_text", utility_offset, saving_text);
  create_estimate_values("system_text", utility_offset, system_text);
  create_estimate_values("panels_text", utility_offset, panels_text);
  create_estimate_values("incentive_text", utility_offset, incentive_text);
  create_estimate_values("total_text", utility_offset, total_text_text);

  step.append(estimate_div);
};

// var panel_rating = 400;
// var cost_per_watt = 1.49;
// var panel_cost = panel_rating * cost_per_watt;
// var labor = 0.5;

//  var mkWh = $("#myRange").val();
//  var mBill = $("#myRange2").val();
//  var offset = 0.5;

// function reCalculate(mkWh, mBill, offset) {
//   var dkWh = mkWh / 31;
//   var rkWh = mkWh / mBill;

//   var nBill = mBill * offset;
//   var sys = dkWh * offset;
//   var panels = (sys * 1000) / panel_rating;

//   var sysCost = panels * panel_cost;
//   var sysCost = sysCost + sysCost * labor;
//   var fedCredit = sysCost * 0.3;

//   $("#txtSavings").html("$" + Math.round(nBill));
//   $("#txtSystemSize").html(Math.round(sys) + " kW");
//   $("#txtPanels").html(Math.round(panels));

//   $("#txtSystemCost").html(USDollar.format(Math.round(sysCost)));
//   $("#txtFedCredit").html(USDollar.format(Math.round(fedCredit)));
// }
