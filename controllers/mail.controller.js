const {
  isValidMessage,
  parseMessage,
} = require("../utils/messageValidator.js");

const { sendQuery } = require("../utils/databaseHandler.js");

const { watsonAssistant } = require("../utils/watsonHandler.js");

const classification = {
  CambioDeClave: 1,
  AdelantoDeSueldo: 2,
  TransferenciaErronea: 3,
};

const saveMessage = (message, classificationType) => {
  sendQuery(`INSERT INTO MESSAGES(origin,topic, pid_country, pid_number, name, lastname, phone, email, identified_customer, 
    access_from, msg_content, type_id)
  VALUES('${message["origin"]}','${message["topic"]}','${message["pid country"]}',${message["pid number"]},
  '${message["name"]}','${message["lastname"]}','${message["phone"]}','${message["email"]}',${message["identified customer"]},
  '${message["access from"]}', '${message["msg content"]}', ${classification[classificationType]});`);
};

const classify = async (req, res) => {
  try {
    isValidMessage(req.body); //Checks if the body is valid, otherwise it will throw an error which will be catched below.
    const message = parseMessage(req.body); // Returns message parsed so that it has only the parameters needed
    console.log(new Date().toLocaleString());
    const classification = await watsonAssistant(message["msg content"]);
    if (classification) {
      console.log(message);
      console.log(classification);
      saveMessage(message, classification);
      res.status(200);
      res.send("Data recieved and processed");
    } else {
      res.status(400);
      res.send("There was an error trying to clasify your msg");
    }
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

module.exports = { classify };
