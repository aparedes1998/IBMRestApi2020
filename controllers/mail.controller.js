const {
  isValidMessage,
  parseMessage,
  watsonAssistant,
} = require("../utils/index.js");
const { insertMessage } = require("../models/message.js");

/**
 * Checks wether a message is valid and then classifies it and uploads it to a database.
 * @param {} req
 * @param {} res
 */
const classify = async (req, res) => {
  try {
    console.log(`Inicio del trabajo: ${new Date().toLocaleString()}`);
    console.log(`Entrada: ${JSON.stringify(req.body, null, 2)}`);
    isValidMessage(req.body); //Checks if the body is valid, otherwise it will throw an error which will be catched below.
    const message = parseMessage(req.body); // Returns message parsed so that it has only the parameters needed
    const classification = await watsonAssistant(message["msg content"]);
    // if (classification) {
    //   console.log(`Clasificacion de watson assistant: ${classification}`);
    //   const result = await insertMessage(message, classification);
    //   if (result) {
    //     res.status(200);
    //     res.send("Data recibida y procesada");
    //   } else {
    //     res.status(400);
    //     res.send(
    //       "Hubo un error al intentar guardar la data en la base de datos, intentelo de nuevo"
    //     );
    //   }
    // } else {
    //   res.status(400);
    //   res.send(
    //     "Hubo un error tratando de clasificar su mensaje, ¡Intente ser más claro!"
    //   );
    // }
    console.log(`Fin del trabajo: ${new Date().toLocaleString()}`);
  } catch (error) {
    console.log(`Fin del trabajo (error): ${new Date().toLocaleString()}`);
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

module.exports = { classify };
