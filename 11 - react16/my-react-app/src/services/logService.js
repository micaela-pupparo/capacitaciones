// import Raven from "raven-js";

function init() {
  // Raven.config("https://05323d37c9a947eba9daaaab1e617a9@sentry.io/1249956", {
  //   release: "0-0-0",
  //   environment: "development-test",
  // }).install();
}

function log(error) {
  console.error(error);
  // Raven.captureException(error);
}

export default {
  init,
  log,
};
