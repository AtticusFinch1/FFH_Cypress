const { defineConfig } = require("cypress");

module.exports = defineConfig({
  reporter: 'cypress-qase-reporter',
  reporterOptions: {
    reporterEnabled: 'cypress-mochawesome-reporter, cypress-qase-reporter',
    cypressMochawesomeReporterReporterOptions: {
      charts: true,
    },
    cypressQaseReporterReporterOptions: {
      apiToken: 'd776d8cd137480d85b525012e7eabd56ede68867031eefb0a41c27f040ba60b5',
      projectCode: 'FC_AUTOMATION',
      logging: true,
      basePath: 'https://api.qase.io/v1',
      screenshotFolder: 'screenshots',
      sendScreenshot: true,
      runComplete: true,
      environmentId: 1,
      rootSuiteTitle: 'Cypress tests',
    },
  },
  projectId: '6r4wyd',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_URL: "https://dev.foothunters.com/",
      UNAME_URL: "https://randomuser.me/api/?inc=name",
      EMAIL: "p1@gmail.com",
      PASSWORD: "password",
      PASSWORD_NEW: "passwordA1",
      EMAIL_PLAYER: 'user1_user1_261',
      EMAIL_COACH: 'rapegor642@otanhome.com',
      EMAIL_OTHER: 'c1@gmail.com',
      EMAIL_SETTINGS: 'asd2@gmail.com',
    }
  },
});
