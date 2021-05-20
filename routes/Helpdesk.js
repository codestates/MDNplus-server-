const express = require("express");
const helpdeskRouter = express.Router();

const helpDeskController = require("../controllers/Helpdesk");

helpdeskRouter.get("/", helpDeskController.getHelpdesk);
helpdeskRouter.get("/me", helpDeskController.getMyHelpdesk);

module.exports = helpdeskRouter;
