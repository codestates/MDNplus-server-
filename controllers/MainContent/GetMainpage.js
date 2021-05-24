const MainContents = require("../../models/MainContents");

module.exports = async (req, res) => {
  console.log('메인페이지에 뿌려주는 요청 들어옴')
  try {
    const main = await MainContents.find();
    res.status(200).send(main);
  } catch (err) {
    res.status(500).send(err);
  }
};
