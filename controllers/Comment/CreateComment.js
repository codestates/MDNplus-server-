const Comments = require("../../models/Comments");
const Questions = require("../../models/Questions");
// 댓글 작성 기능

module.exports = async (req, res) => {
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { userId } = req.session;

    const { questionId, content, pureContent } = req.body;

    if (!userId) {
      return res.status(401).send("not authorization");
    }
    if (!content) {
      return res.status(400).send("content is required");
    }
    const comment = new Comments({ questionId, content, userId, pureContent });
    await comment.save();
    await Questions.findOneAndUpdate(
      { _id: questionId },
      { $inc: { commentCount: 1 } },
      { new: true }
    );
    res.status(201).send("created the comment.");
  } catch (err) {
    res.status(500).send(err);
  }
};

//comment가 생성될때마다 questions.commentCount +1
