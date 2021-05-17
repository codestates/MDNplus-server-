const express = require("express");
const mainPageRouter = express.Router();

const section = require("../../controllers/Section");

mainPageRouter.get("/", section.mainPageController.getMainpage);
mainPageRouter.patch("/", section.mainPageController.modifyMainpage);

module.exports = mainPageRouter;
