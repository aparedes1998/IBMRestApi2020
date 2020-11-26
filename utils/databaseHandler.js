const ibmdb = require("ibm_db");
const dotenv = require("dotenv");

const path = require("path");
dotenv.config({ path: path.resolve(__dirname, "../.env") });

const UID = process.env.DB_UID;
const PWD = process.env.DB_PW;
const connStr = `DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-11.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=${UID};PWD=${PWD};Security=SSL;`;

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
