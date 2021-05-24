const express = require("express");
const userInfoRouter = express.Router();

const userInfoController = require("../controllers/UserInfo");

userInfoRouter.get("/", userInfoController.getImgAndNick);
userInfoRouter.patch("/img", userInfoController.modifyImg);
userInfoRouter.delete("/img", userInfoController.deleteImg);
userInfoRouter.patch("/nick", userInfoController.modifyNick);
userInfoRouter.delete("/membership", userInfoController.deleteMembership);

module.exports = userInfoRouter;
