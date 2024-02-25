function filter_empty_custom_fields(obj = {}) {
  const fields_to_ignore = [
    "Survey Completed Doc",
    "Authorization Signature",
    "workflow",
    "gclid",
    "contact_type",
    "contact_source",
    "contact_id",
    "full_name",
    "email",
    "phone",
    "city",
    "state",
    "country",
    "contact",
    "location",
    "customData",
    "first_name",
    "last_name",
    "tags",
    "address1",
    "date_created",
    "postal_code",
    "contact_source",
    "full_address",
    "attributionSource",
    "contact",
    "triggerData",
  ];

  const object_keys = Object.keys(obj);

  let filtered_obj = {};

  let filtered_keys = object_keys.filter((key) => obj[key] !== "");

  filtered_keys.forEach((key) => {
    if (fields_to_ignore.includes(key)) return;
    filtered_obj[key] = obj[key];
  });

  return filtered_obj;
}

module.exports = filter_empty_custom_fields;
