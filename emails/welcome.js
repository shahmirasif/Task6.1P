const config = require("config");
const fs = require("fs");
const api_key = config.get("mailgunApiKey");
const domain = config.get("mailgun-domain");
var mailgun = require("mailgun.js");
var mg = mailgun.client({
  username: "api",
  key: api_key,
});

module.exports = async (user) => {
  var template = fs
    .readFileSync(__dirname + "/templates/welcome.html")
    .toString();

  var data = {
    from: "ICROWD <no-reply@icrowd.com>",
    to: user.email,
    subject: "Welcome to the platform",
    html: template,
  };

  return await mg.messages.create(domain, data);
};
