const { default: axios } = require("axios");

async function post_pdf_to_contact(request, response) {
  const { full_name, email, location_id, surveyId, surveypage_url } =
    request.formatted_data;

  const eventData = {
    source: "direct",
    page: {
      url: surveypage_url,
      title: "Annuity Facts Now",
    },
    timestamp: new Date().getTime(),
    type: "page-visit",
    domain: "https://www.ushealthprogram.com/",
  };

  const fd = {
    full_name: full_name,
    email: email,
    formId: surveyId.trim(),
    location_id: location_id.trim(),
    eventData: eventData,
  };

  try {
    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: "https://services.leadconnectorhq.com/surveys/submit",
      headers: {
        "content-type": "application/json",
      },
      data: fd,
    };

    const contact = await axios.request(config);
    return contact.data;
  } catch (error) {
    console.log(error);
  }

  return true;
}

module.exports = post_pdf_to_contact;
