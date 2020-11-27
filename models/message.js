const { sendQuery } = require("../utils/index.js");

/**
 * Inserts message in the database and classifies it by a classification type (only works with previously defined types for consistency
 * and security)
 * @param {JSON Object} message
 * @param {String} classification
 */
const insertMessage = async (message, classification) => {
  return sendQuery(`INSERT INTO MESSAGES(origin,topic, pid_country, pid_type, pid_number, name, lastname, phone, email, identified_customer, 
      access_from, msg_content, type)
    VALUES('${message["origin"]}','${message["topic"]}','${message["pid country"]}','${message["pid type"]}',${message["pid number"]},
    '${message["name"]}','${message["lastname"]}','${message["phone"]}','${message["email"]}',${message["identified customer"]},
    '${message["access from"]}', '${message["msg content"]}', '${classification}');`).then(
    (res) => res
  );
};

module.exports = {
  insertMessage,
};
