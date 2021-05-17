const express = require("express");
const commentRouter = express.Router();

const qna = require("../../controllers/Qna");

commentRouter.post("/", qna.commentController.createComment);
commentRouter.patch("/", qna.commentController.modifyComment);
commentRouter.delete("/", qna.commentController.deleteComment);
commentRouter.get("/", qna.commentController.getComment);

module.exports = commentRouter;
