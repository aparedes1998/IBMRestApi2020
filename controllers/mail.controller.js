const {
  isValidMessage,
  parseMessage,
} = require("../utils/messageValidator.js");

const classify = (req, res) => {
  try {
    isValidMessage(req.body);
    const message = parseMessage(req.body);
    message.id = `${new Date().getTime()}`;
    res.status(200);
    res.send("Data recieved and processed");
  } catch (error) {
    res.status(400);
    res.send({
      error: error.message,
    });
  }
};

module.exports = { classify };
