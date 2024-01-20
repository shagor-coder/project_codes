export let config_data = {
  client_id: "{{ custom_values.client_id }}",
  client_secret: "{{ custom_values.client_secret }}",
  sheet_url: "{{ custom_values.sheet_url }}",
  location_id: "{{ custom_values.location_id }}",
  calendar_id: "{{ custom_values.calendar_id }}",
  access_token: "",
  refresh_token: "",
  expires_in: "",
};

export const change_config = (name, value) => {
  config_data[name] = value;
};
