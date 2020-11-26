const ibmdb = require("ibm_db");
const dotenv = require("dotenv");

const path = require("path");
const a = dotenv.config({ path: path.resolve(__dirname, "../.env") });

const uid = process.env.DB_UID;
const pwd = process.env.DB_PW;
const connStr = `DATABASE=BLUDB;HOSTNAME=dashdb-txn-sbox-yp-dal09-11.services.dal.bluemix.net;PORT=50001;PROTOCOL=TCPIP;UID=${uid};PWD=${pwd};Security=SSL;`;

const sendQuery = (query) => {
  ibmdb.open(connStr, (err, conn) => {
    conn.query(query, (err, data) => {
      console.log(data);
      return data;
    });
    conn.close();
  });
};

sendQuery("select * from messages");
module.exports = {
  sendQuery,
};
