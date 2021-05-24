const MainContents = require("../../models/MainContents");

module.exports = async (req, res) => {
  try {
    const main = await MainContents.find();
    res.status(200).send(main);
  } catch (err) {
    res.status(500).send(err);
  }
};
