export const create_info_html = (data = {}, info_con, appointment_con) => {
  const {
    firstName,
    lastName,
    title,
    only_start_date,
    only_start_time,
    make,
    model,
  } = data;

  info_con.innerHTML = `
      <h1 class="headline_text fw-700">${firstName} ${lastName}</h1>
      <h2 class="subheadline_text">We're looking forward to your ${title}</div>
    `;

  appointment_con.innerHTML = `
      <h2 class="subheadline_text fw-700">${title}</div>
      <h2 class="subheadline_text">${only_start_date}</div>
      <h2 class="paragraph_text">Drop off your ${make} ${model} at our shop tomorrow at ${only_start_time}.</div>
    `;
};
