const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars");
const templateSource = require("./template-source");

const createTemplate = (opportunities) => {
  // const templatePath = path.join(
  //   __dirname,
  //   "../views",
  //   `email-template.handlebars`
  // );
  // const templateSource = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = exphbs.create().handlebars.compile(templateSource);

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

  const html = compiledTemplate(flattenedOpportunities, {
    allowedProtoProperties: true,
  });
  return html;
};

module.exports = createTemplate;
