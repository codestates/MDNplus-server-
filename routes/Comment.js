const express = require("express");
const commentRouter = express.Router();

const commentController = require("../controllers/Comment");

commentRouter.post("/", commentController.createComment);
commentRouter.patch("/", commentController.modifyComment);
commentRouter.delete("/", commentController.deleteComment);
commentRouter.post("/like", commentController.likeUpAndDown);
commentRouter.get("/:commentid", commentController.getCommentOne);

module.exports = commentRouter;
