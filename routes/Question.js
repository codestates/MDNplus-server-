const express = require("express");
const questionRouter = express.Router();

const questionController = require("../controllers/Question");

questionRouter.post("/", questionController.createQuestion);
questionRouter.patch("/", questionController.modifyQuestion);
questionRouter.get("/:questionid", questionController.getQuestionOne);
questionRouter.delete("/", questionController.deleteQuestion);
questionRouter.post("/like", questionController.likeUpAndDown);

module.exports = questionRouter;
