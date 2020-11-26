/**
 * List of possible values (enums) for certain keys (topic, origin, loan)
 */
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

/**
 * Expected message parameters
 */
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

/**
 * Checks wether a value from the body is defined within its enum.
 * @param {string} type Enum expected from the recieved data
 * @param {string} data Data recieved
 */
const isValidType = (type, data) => {
  if (typeof data === "string" && TYPES[type]) {
    if (TYPES[type].includes(data)) {
      return true;
    }
    throw new Error(`El parámetro de tipo ${type} no es válido.`);
  }
  throw new Error(`El parámetro de tipo ${type} no es válido.`);
};

/**
 * Checks wether an email has a valid format using regex.
 * @param {string} email
 */
const isValidEmail = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(String(email).toLowerCase())) {
    return true;
  }
  throw new Error("El formato de email introducido es inválido.");
};
/**
 * Checks wether the introduced data is indeed a number
 * @param {Number} data
 */
const isNumerical = (data) => {
  if (typeof data === "number") {
    return true;
  }
  throw new Error("El parámetro pid number debe ser un número");
};

/**
 * Checks if a string cointains any white space
 * @param {string} text
 */
const containsWhiteSpace = (text) => {
  if (text.indexOf(" ") === 0) {
    return true;
  }
  throw new Error(
    "El parámetro access from no debe contener espacios ni tabulaciones"
  );
};

/**
 * Parses the body of the message so that it has only the necessary parameters.
 * It filters out any extra parameter recieved.
 * @param {JSON Object} data
 */
const parseMessage = (data) => {
  let message = {};
  MESSAGE_PARAMETERS.forEach((parameter) => {
    message[parameter] = data[parameter];
  });
  return message;
};

/**
 * Checks wether a message is valid under certain conditions.
 * 1 - Checks if the body has all the expected keys and values
 * 2 - Checks if all enum parts are defined within the enum scope.
 * 3 - Checks if expected numbers are indeed numbers
 * 4 - Checks if the email received has an email structure
 * 5 - Checks if "accessFrom" key has no white spaces.
 * @param {JSON Object} body
 */
const isValidMessage = (body) => {
  MESSAGE_PARAMETERS.forEach((parameter) => {
    if (!body[parameter]) {
      throw new Error(
        `El parámetro: ${parameter} no fue encontrado en el cuerpo del mensaje.`
      );
    }
  });
  return (
    isValidType("ORIGIN", body["origin"]) &&
    isValidType("TOPIC", body["topic"]) &&
    isValidType("PID_TYPE", body["pid type"]) &&
    isNumerical(body["pid number"]) &&
    isValidEmail(body["email"]) &&
    containsWhiteSpace(body["access from"])
  );
};

module.exports = {
  parseMessage,
  isValidMessage,
};
