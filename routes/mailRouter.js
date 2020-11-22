const { classify } = require("../controllers/mail.controller.js");

const express = require("express");

const mailRouter = express.Router();

mailRouter.get("/", (req, res) => {
  res.send("Hello World!");
});

mailRouter.post("/classify", classify);

module.exports = mailRouter;
