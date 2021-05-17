const express = require("express");
const questionRouter = express.Router();

const qna = require("../../controllers/Qna");

questionRouter.get("/", qna.questionController.getquestionAll);
questionRouter.post("/", qna.questionController.createQuestion);
questionRouter.patch("/", qna.questionController.modifyQuestion);

module.exports = questionRouter;
