const Comments = require("../../models/Comments");

// 댓글 수정 기능

module.exports = async (req, res) => {
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { userId } = req.session;
    const { commentId, content, pureContent } = req.body;

    if (!userId) {
      return res.status(401).send("not authorization");
    }
    if (!content) {
      return res.status(400).send("content is required");
    }
    const comment = await Comments.findOneAndUpdate(
      { _id: commentId },
      { content, pureContent },
      { new: true }
    );
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};
