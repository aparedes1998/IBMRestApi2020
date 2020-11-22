const { mailRouter } = require("./routes/index.js");
const express = require("express");

const app = express();
const port = 3000;

app.listen(port, () => {
  console.log(`Server listening in http://localhost:${port}`);
});

app.use("/mail", mailRouter);
