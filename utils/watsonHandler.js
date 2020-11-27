const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");
const dotenv = require("dotenv");

// Configuring the env variables.
const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

/**
 * Ties message to one of three intentions:
 * 1 - Password change (#CambioDeClave)
 * 2 - Pay advance (#AdelantoDeSueldo)
 * 3 - Failed Transfer (#TransferenciaErronea)
 * If it can't tie it with any of the above (0 confidence in any), it returns undefined
 * @param {string} message
 */
const watsonAssistant = async (message) => {
  const assistant = new AssistantV2({
    version: "2020-04-01",
    authenticator: new IamAuthenticator({
      apikey: process.env.WATSON_API_KEY,
    }),
    serviceUrl:
      "https://api.us-south.assistant.watson.cloud.ibm.com/instances/2d2bb9c1-9023-4a50-816e-7067c605f171",
  });

  return assistant
    .messageStateless({
      assistantId: "919afab7-3294-4d34-8c57-476c00ef7803",
      input: {
        message_type: "text",
        text: message,
      },
    })
    .then((res) => {
      const result = res.result.output.intents;
      if (result.length > 0) {
        const classification = result[0].intent;
        const confidence = result[0].confidence;
        if (confidence > 0.75) {
          // if the assistant has a 75% certainty of an intent
          return classification;
        } else {
          return undefined;
        }
      } else {
        return undefined;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = watsonAssistant;
