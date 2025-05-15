const axios = require("axios").default;
const change_info_text_case = require("../utils/change_info_case");

async function update_contact_info(request, response) {
  const { id, email, location_api_key } = request.formatted_data;

  const {
    postal_first_name,
    postal_last_name,
    address,
    city,
    state,
    zip,
    household_income,
    net_worth,
    home_owner_status,
    home_market_value,
    length_of_residence,
    rfm_online_avg_days,
    rfm_offline_avg_days,
    rfm_avg_dollars,
    age,
  } = request.atd_info;

  const atd_info_obj = {
    postal_first_name,
    postal_last_name,
    postal__street: address,
    postal__city: city,
    postal__state: state,
    postal__postal_code: zip,
    postal__age: age,
    household_income,
    net_worth,
    home_owner_status,
    home_market_value,
    length_of_residence,
    rfm_online_avg_days,
    rfm_offline_avg_days,
    rfm_avg_dollars,
  };

  const customFields = {};

  const keys = Object.keys(atd_info_obj);

  keys.forEach((key) => {
    if (!atd_info_obj[key] || atd_info_obj[key] === "") return;
    if (key === "postal__state") {
      customFields[key] = atd_info_obj[key];
    } else {
      customFields[key] = change_info_text_case(atd_info_obj[key]);
    }
  });

  try {
    const config = {
      method: "PUT",
      url: `https://rest.gohighlevel.com/v1/contacts/${id.trim()}`,
      headers: {
        Authorization: `Bearer ${location_api_key}`,
        "Content-Type": "application/json",
      },
      data: { email: email, customField: customFields },
    };

    const contact = await axios.request(config);

    response.status(200).json({
      message: "The contact successfully updated!!",
      contact: contact.data,
    });
  } catch (error) {
    console.log(error);

    response.status(404).json({
      message: "Contact not updated!!",
      err: error.message,
    });
  }
}

module.exports = update_contact_info;
