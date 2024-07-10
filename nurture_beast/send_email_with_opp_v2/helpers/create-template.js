const { create } = require("express-handlebars");
const templateSource = require("./template-source");

const compiledTemplate = create().handlebars.compile(templateSource);

const createTemplate = (opportunities = []) => {
  const birthdays =
    opportunities.filter((opp) => opp.opportunityType === "Birthday") || [];
  const touchbases =
    opportunities.filter((opp) => opp.opportunityType === "Touch Base") || [];

  const flattenedBirthdayOpportunities = birthdays?.map((opp) => {
    const {
      contact_id,
      first_name,
      last_name,
      email,
      opportunityType,
      locationId,
    } = opp;

    return {
      contact_id,
      first_name,
      last_name,
      email,
      opportunityType,
      locationId,
    };
  });

  const flattenedTouchbaseOpportunities = touchbases?.map((opp) => {
    const {
      contact_id,
      first_name,
      last_name,
      email,
      opportunityType,
      locationId,
    } = opp;

    return {
      contact_id,
      first_name,
      last_name,
      email,
      opportunityType,
      locationId,
    };
  });

  const html = compiledTemplate(
    {
      birthday: flattenedBirthdayOpportunities,
      touchbase: flattenedTouchbaseOpportunities,
    },
    {
      allowedProtoProperties: true,
      helpers: {
        slice: (array) => array.slice(0, 3),
        length: (array) => array.length > 3,
        objkeys: (obj) => Object.keys(obj),
        getLocationId: (array) => {
          if (array.length) {
            return array[0].locationId;
          } else return "";
        },
      },
    }
  );
  return html;
};

module.exports = createTemplate;
