const fs = require("fs");
const path = require("path");
const exphbs = require("express-handlebars");

const createTemplate = (opportunities) => {
  const templatePath = path.join(__dirname, "../views", `email-template.hbs`);
  const templateSource = fs.readFileSync(templatePath, "utf-8");
  const compiledTemplate = exphbs.create().handlebars.compile(templateSource);
  const html = compiledTemplate(opportunities);
  return html;
};

module.exports = createTemplate;
