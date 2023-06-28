const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    env: {
      API_URL: "https://dev.foothunters.com/",
      EMAIL: "player1@gmail.com",
      PASSWORD: "password",
      PASSWORD_NEW: "passwordA1",
    }
  },
});
