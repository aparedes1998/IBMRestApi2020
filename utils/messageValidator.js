const TYPES = {
  TOPIC: [
    "loan",
    "visa debit card application",
    "credit card",
    "password reassignment",
    "salary savings",
    "claims - atms or correspondents",
    "adherence to online banking",
    "savings account - closing",
  ],
  ORIGIN: ["contacto"],
  PID_TYPE: ["ci", "passport"],
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
    if (TYPES[type].includes(data)) {
      return true;
    }
    throw new Error(`Parameter of type ${type} is not valid.`);
  }
  throw new Error(`Parameter of type ${type} is not valid.`);
};

const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return true;
  }
  throw new Error("The email format introduced is invalid.");
};
const isNumerical = (data) => {
  if (typeof data === "number") {
    return true;
  }
  throw new Error("The pid number introduced is NOT a number");
};

const containsWhiteSpace = (text) => {
  if (text.indexOf(" ") >= 0) {
    return true;
  }
  throw new Error("Access from parameter should not contain any white space");
};
const parseMessage = (data) => {
  let message = {};
  MESSAGE_PARAMETERS.forEach((parameter) => {
    message[parameter] = data[parameter];
  });
  return message;
};

const isValidMessage = (body) => {
  MESSAGE_PARAMETERS.forEach((parameter) => {
    if (!body[parameter]) {
      throw new Error(`Parameter: ${parameter} not found on message body`);
    }
  });
  return (
    isValidType("ORIGIN", body["origin"]) &&
    isValidType("TOPIC", body["topic"]) &&
    isValidType("PID_TYPE", body["pid type"]) &&
    isNumerical(body["pid number"]) &&
    isValidEmail(body["email"])
  );
};

module.exports = {
  parseMessage,
  isValidMessage,
};
