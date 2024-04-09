const axios = require("axios").default;
const FormData = require("form-data");
const change_info_text_case = require("./change_info_case");

async function update_contact_info(request, response) {
  const { email, location_id, surveyId, checkout_page, location_name } =
    request.formatted_data;

  const fData = new FormData();

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
  } = request.atd_info;

  const atd_info_obj = {
    postal_first_name,
    postal_last_name,
    postal__street: address,
    postal__city: city,
    postal__state: state,
    postal__postal_code: zip,
    household_income,
    net_worth,
    home_owner_status,
    home_market_value,
    length_of_residence,
    rfm_online_avg_days,
    rfm_offline_avg_days,
    rfm_avg_dollars,
  };

  const eventData = {
    source: "direct",
    page: {
      url: checkout_page,
      title: location_name,
    },
    timestamp: new Date().getTime(),
    type: "page-visit",
    domain: "https://www.annuityanswersnow.com/",
  };

  let formData = {
    email: email,
    formId: surveyId.trim(),
    location_id: location_id.trim(),
    eventData: eventData,
  };

  const keys = Object.keys(atd_info_obj);

  keys.forEach((key) => {
    if (!atd_info_obj[key] || atd_info_obj[key] === "") return;
    if (key === "postal__state") return (formData[key] = atd_info_obj[key]);
    formData[key] = change_info_text_case(atd_info_obj[key]);
  });

  fData.append("formData", JSON.stringify(formData));

  try {
    const config = {
      method: "post",
      url: "https://services.leadconnectorhq.com/surveys/submit",
      headers: {
        ...fData.getHeaders(),
      },
      data: fData,
      maxBodyLength: Infinity, // Move maxBodyLength here
    };

    const contact = await axios.request(config);

    return response.status(200).json({
      message: "The contact successfully updated!!",
      contact: contact.data,
    });
  } catch (error) {
    console.error(error);
    return response.status(404).json({
      message: "Contact not updated!!",
      err: error.message,
    });
  }
}

module.exports = update_contact_info;
