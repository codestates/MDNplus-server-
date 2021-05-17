const express = require("express");
const myPageRouter = express.Router();

const section = require("../../controllers/Section");

myPageRouter.get("/", section.myPageController.getMypage);

module.exports = { myPageRouter };
