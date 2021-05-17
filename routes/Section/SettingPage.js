const express = require("express");
const settingPageRouter = express.Router();

const section = require("../../controllers/Section");

settingPageRouter.get("/", section.settingPageController.getImgAndNick);
settingPageRouter.patch("/", section.settingPageController.modifyImg);
settingPageRouter.delete("/", section.settingPageController.deleteImg);
settingPageRouter.put("/", section.settingPageController.modifyNick);
settingPageRouter.delete(
  "/membership",
  section.settingPageController.deleteMembership
);

module.exports = settingPageRouter;
