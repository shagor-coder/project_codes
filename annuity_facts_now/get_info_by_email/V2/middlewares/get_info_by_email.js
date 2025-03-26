const axios = require("axios").default;
const process_atd_info = require("../utils/process_atd_info");

async function get_info_by_email(request, response, next) {
  const { email } = request.formatted_data;

  const request_url = `https://api.atdata.com/v5/eppend?email=${email.trim()}&api_key=${
    process.env.API_KEY
  }`;

  try {
    let config = {
      method: "post",
      url: request_url,
      headers: {
        "content-type": "application/json",
      },
    };
    const { data } = await axios.request(config);
    const atd_info = process_atd_info(data);
    request.atd_info = atd_info;
    next();
  } catch (error) {
    console.log(error);

    response.status(500).json({
      message: "No Info Was Found!!",
    });
  }
}

module.exports = get_info_by_email;
