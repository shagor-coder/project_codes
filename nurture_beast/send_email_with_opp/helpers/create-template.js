const { create } = require("express-handlebars");
const templateSource = require("./template-source");

const compiledTemplate = create().handlebars.compile(templateSource);

const createTemplate = (opportunities) => {
  const flattenedOpportunities = opportunities?.map((opp) => {
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
    { opportunities: flattenedOpportunities },
    {
      allowedProtoProperties: true,
      helpers: {
        slice: (array) => array.slice(0, 4),
        length: (array) => array.length > 4,
      },
    }
  );
  return html;
};

module.exports = createTemplate;
