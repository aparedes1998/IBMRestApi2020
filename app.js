/**
 * Main class from the program
 */

const { mailRouter } = require("./routes/index.js");
const express = require("express");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});

/**
 * Here we set the redirection routes
 */
app.use("/mail", mailRouter);
