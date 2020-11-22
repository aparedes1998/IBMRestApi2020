const { mailRouter } = require("./routes/index.js");
const express = require("express");

const app = express();
const PORT = 3000;

app.use(express.json());
app.listen(PORT, () => {
  console.log(`Server listening in http://localhost:${PORT}`);
});

app.use("/mail", mailRouter);
