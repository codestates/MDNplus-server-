const express = require("express");
const searchRouter = express.Router();

const qna = require("../../controllers/Qna");

searchRouter.post("/", qna.searchController.searchQuestion);

module.exports = { searchRouter };
