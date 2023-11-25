function process_atd_info(request, response) {
  const {
    postal_address,
    net_worth,
    rfm_online_avg_days,
    household_income,
    home_owner_status,
    rfm_offline_avg_days,
    home_market_value,
    length_of_residence,
    rfm_avg_dollars,
  } = request.atd_response_data;

  if (!postal_address)
    return response.status(500).json({
      message: "Internal server Error!!",
    });

  const {
    first_name,
    last_name,
    address,
    city,
    state,
    zip: long_zip,
  } = postal_address;

  const atd_info = {
    postal_first_name: first_name ? first_name : "",
    postal_last_name: last_name ? last_name : "",
    address: address ? address : "",
    city: city ? city : "",
    state: state ? state : "",
    zip: long_zip ? long_zip : "",
    household_income: household_income ? household_income : "",
    net_worth: net_worth ? net_worth : "",
    home_owner_status: home_owner_status ? home_owner_status : "",
    home_market_value: home_market_value ? home_market_value : "",
    length_of_residence: length_of_residence ? length_of_residence : "",
    rfm_online_avg_days: rfm_online_avg_days ? rfm_offline_avg_days : "",
    rfm_offline_avg_days: rfm_offline_avg_days ? rfm_offline_avg_days : "",
    rfm_avg_dollars: rfm_avg_dollars ? rfm_avg_dollars : "",
  };

  return (request.atd_info = atd_info);
}

module.exports = process_atd_info;
