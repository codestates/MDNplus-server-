const express = require("express");
const searchRouter = express.Router();

const searchController = require("../controllers/Search");

searchRouter.post("/", searchController.search);

module.exports = searchRouter;
