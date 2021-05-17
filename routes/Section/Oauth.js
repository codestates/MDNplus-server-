const express = require("express");
const oauthRouter = express.Router();

const section = require("../../controllers/Section");

oauthRouter.post("/", section.oauthController.oauthLogin);

module.exports = { oauthRouter };
