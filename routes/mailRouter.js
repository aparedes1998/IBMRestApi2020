/**
 * Router for the /mail subdomain
 */
const { classify } = require("../controllers/mail.controller.js");

const express = require("express");

const mailRouter = express.Router();

mailRouter.post("/classify", classify);

module.exports = mailRouter;
