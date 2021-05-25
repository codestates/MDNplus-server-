const express = require("express");
const oauthRouter = express.Router();

const oauthController = require("../controllers/Oauth");

oauthRouter.post("/", oauthController.oauthLogin);
oauthRouter.post("/nick", oauthController.oauthSignup);
oauthRouter.post("/logout", oauthController.oauthLogout);

module.exports = oauthRouter;
