const Comments = require("../../models/Comments");

// 댓글 삭제 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { commentId } = req.body;

    if (!userId) {
      return res.status(400).send("not authorizaion");
    }
    await Comments.deleteOne({ _id: commentId });

    res.status(200).send("댓글이 삭제되었습니다");
  } catch (err) {
    res.status(500).send(err);
  }
};
