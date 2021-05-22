const mainContents = require("../../models/MainContents");

module.exports = async (req, res) => {
  try {
    const main = await mainContents.find();
    res.status(200).send(main);
  } catch (err) {
    res.status(500).send(err);
  }
};
