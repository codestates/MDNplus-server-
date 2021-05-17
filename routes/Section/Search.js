const express = require("express");
const searchRouter = express.Router();

const section = require("../../controllers/Section");

searchRouter.post("/", section.searchController.searchMethod);

module.exports = searchRouter;
