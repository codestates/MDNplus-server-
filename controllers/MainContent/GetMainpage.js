const mainContents = require("../../models/MainContents");
const users = require("../../models/Users");

module.exports = async (req, res) => {
  let main = await mainContents.find({});
  console.log(main); //왜 안뜨는지 찾아보기

  let userInfo = await users.find({});
  console.log(userInfo);
};
