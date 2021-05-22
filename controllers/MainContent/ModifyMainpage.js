const MainContents = require("../../models/MainContents");

module.exports = async (req, res) => {
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { userId } = req.session;
    const { mainContentId, body } = req.body;
    if (!userId) {
      return res.status(400).send("not authorization");
    }
    const main = await MainContents.findOneAndUpdate(
      { _id: mainContentId },
      { body, $inc: { count: 1 } },
      { new: true }
    );
    res.status(200).send(main);
  } catch (err) {
    res.status(500).send(err);
  }
};
