const AssistantV2 = require("ibm-watson/assistant/v2");
const { IamAuthenticator } = require("ibm-watson/auth");

const watsonAssistant = async (message) => {
  const assistant = new AssistantV2({
    version: "2020-04-01",
    authenticator: new IamAuthenticator({
      apikey: "yHdA5bbBgPtyW2fie2QkTaAd8mUzEOk-9WFhvPV8TKPO",
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
        console.log(classification);
        console.log(confidence);
        if (confidence > 0.75) {
          return classification;
        } else {
          return undefined;
        }
      } else {
        console.log(
          "Dejar sin clasificar (el asistente no pudo decidir entre ninguna de las 3 intenciones)"
        );
        return undefined;
      }
    })
    .catch((err) => {
      console.log(err);
    });
};
module.exports = {
  watsonAssistant,
};
