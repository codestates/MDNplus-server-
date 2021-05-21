const Comments = require("../../models/Comments");

// 댓글 작성 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { questionId, content } = req.body;

    if (!userId) {
      return res.status(400).send("not authorization");
    }
    if (!content) {
      return res.status(400).send("content is required");
    }
    const comment = new Comments({ questionId, content });
    await comment.save();
    res.status(201).send("댓글이 등록되었습니다.");
  } catch (err) {
    res.status(500).send(err);
  }
};
