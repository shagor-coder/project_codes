export const find_contact_custom_fiels = (
  custom_fields,
  location_custom_fields
) => {
  const contact_custom_field = location_custom_fields.filter((lcf) => {
    return custom_fields.find((cf) => cf.id === lcf.id);
  });

  const connected_custom_fields = contact_custom_field.map((cf) => {
    let lcf = custom_fields.find((f) => f.id === cf.id);

    return { ...cf, ...lcf };
  });

  let formatted_custom_fields = {};

  connected_custom_fields.forEach((cf) => {
    return (formatted_custom_fields[cf.fieldKey.replace("contact.", "")] =
      cf.value);
  });

  return formatted_custom_fields;
};
