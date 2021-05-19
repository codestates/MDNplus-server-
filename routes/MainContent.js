const express = require("express");
const mainContentRouter = express.Router();

const mainContentController = require("../controllers/MainContent");

mainContentRouter.get("/", mainContentController.getMainpage);
mainContentRouter.patch("/", mainContentController.modifyMainpage);

module.exports = mainContentRouter;
