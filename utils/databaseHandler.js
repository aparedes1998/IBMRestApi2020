const ibmdb = require("ibm_db");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const connStr = `${process.env.DSN}Security=SSL;`;

/**
 * Sends a query to the database and returns the response.
 * @param {string} query
 */
const sendQuery = (query) => {
  return ibmdb
    .open(connStr)
    .then((conn) => {
      return conn
        .query(query)
        .then((data) => {
          conn.close();
          return data;
        })
        .catch((error) => {
          return undefined;
        });
    })
    .catch((error) => {
      return undefined;
    });
};
module.exports = sendQuery;
