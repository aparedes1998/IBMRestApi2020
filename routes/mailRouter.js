const express = require("express");

const mailRouter = express.Router();

mailRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

mailRouter.post("/classify", (req, res) => {});

module.exports = mailRouter;
