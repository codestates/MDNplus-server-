const MainContents = require("../../models/MainContents");

module.exports = async (req, res) => {
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    console.log("글 수정하는 요청 들어옴");
    const { userId } = req.session;
    const { mainContentId, body, pureBody } = req.body;

    console.log(userId, mainContentId, body, pureBody);
    if (!userId) {
      return res.status(401).send("not authorization");
    }
    const main = await MainContents.findOneAndUpdate(
      { _id: mainContentId },
      { body, $inc: { count: 1 }, purebody },
      { new: true }
    );
    console.log(main);
    res.status(200).send(main);
  } catch (err) {
    res.status(500).send(err);
  }
};
