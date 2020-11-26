const sendQuery = require("./databaseHandler.js");
const watsonAssistant = require("./watsonHandler.js");
const { parseMessage, isValidMessage } = require("./messageValidator.js");

module.exports = {
  sendQuery,
  watsonAssistant,
  parseMessage,
  isValidMessage,
};
