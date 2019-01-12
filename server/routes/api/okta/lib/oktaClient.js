const okta = require("@okta/okta-sdk-nodejs");

const client = new okta.Client({
  orgUrl: "https://dev-612249.oktapreview.com",
  token: "00NmqnrLXgO78pIiapL_psQv0oR0sAZYs2ITca3sJ9"
});

module.exports = client;
