interface customFieldsType {
  name: string;
  email: string;
}

export const filterEmptyCustomFields = (customFields: customFieldsType) => {
  const fieldsToIgnore = [
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
    "Agent Termination PDF",
    "Final Attestation PDF",
  ];

  const keys = Object.keys(customFields);

  let filteredObject: any = {};

  let filteredKeys = keys.filter(
    (key: string) => customFields[key as keyof customFieldsType] !== ""
  );

  filteredKeys.forEach((key: string) => {
    if (fieldsToIgnore.includes(key)) return;
    filteredObject[key] = customFields[key as keyof customFieldsType];
  });

  return filteredObject;
};
