const TYPES = {
  TOPICS: [
    "loan",
    "visa debit card application",
    "credit card",
    "password reassignment",
    "salary savings",
    "claims - atms or correspondents",
    "adherence to online banking",
    "savings account - closing",
  ],
  ORIGINS: ["contacto"],
  PID_TYPES: ["ci", "passport"],
};
const MESSAGE_PARAMETERS = [
  "origin",
  "topic",
  "pid country",
  "pid type",
  "pid number",
  "name",
  "lastname",
  "phone",
  "email",
  "identified customer",
  "access from",
  "msg content",
];

const isValidType = (type, data) => {
  if (typeof data === "string" && TYPES[type]) {
    console.log(data);
    return TYPES[type].includes(data);
  }
  return false;
};

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
};

const parseMessage = (data) => {
  let message = {};
  MESSAGE_PARAMETERS.forEach((parameter) => {
    message[parameter] = data[parameter];
  });
  return message;
};

const isValidMessage = (body) => {
  let validStructure = true;
  MESSAGE_PARAMETERS.forEach((parameter) => {
    if (!body[parameter]) {
      validStructure = false;
    }
  });
  return (
    isValidType("ORIGINS", body["origin"]) &&
    isValidType("TOPICS", body["topic"]) &&
    isValidType("PID_TYPES", body["pid type"]) &&
    typeof body["pid number"] === "number" &&
    validStructure &&
    isValidEmail(body["email"])
  );
  // Verificar numeros y email valido.
};

const classify = (req, res) => {
  const isValid = isValidMessage(req.body);
  if (!isValid) {
    res.status(400);
    res.send("Le erraste");
  } else {
    const message = parseMessage(req.body);
    message.id = `${new Date().getTime()}`;
    console.log(message);
    res.status(200);
    res.send("nice one m8");
  }
};

module.exports = { classify };
