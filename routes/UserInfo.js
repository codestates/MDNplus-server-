const express = require("express");
const userInfoRouter = express.Router();

const userInfoController = require("../controllers/UserInfo");

userInfoRouter.get("/", userInfoController.getImgAndNick);
userInfoRouter.patch("/", userInfoController.modifyImg);
userInfoRouter.delete("/", userInfoController.deleteImg);
userInfoRouter.put("/", userInfoController.modifyNick);
userInfoRouter.delete("/membership", userInfoController.deleteMembership);

module.exports = userInfoRouter;
