import { defineConfig } from "cypress";

export default defineConfig({
  reporter: 'mochawesome',
  reporterOptions: {
  reportDir: 'cypress/results',
  overwrite: false,
  html: true,
  json: true,
  showPassed:true,
  showFailed:true,
  showSkipped:true,
  saveHtml:true,
  chart:true,
  enabledCode:false,
  screenshotOnRunFailure: true,

  
  },
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
