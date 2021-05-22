const Comments = require("../../models/Comments");
const Questions = require("../../models/Questions");
// 댓글 삭제 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { questionId, commentId } = req.body;

    if (!userId) {
      return res.status(400).send("not authorizaion");
    }
    await Comments.deleteOne({ _id: commentId });
    await Questions.findOneAndUpdate(
      { _id: questionId },
      { $inc: { commentCount: -1 } },
      { new: true }
    );
    res.status(200).send("댓글이 삭제되었습니다");
  } catch (err) {
    res.status(500).send(err);
  }
};

//+++++++++++++++ 추가해야함.
// userId로 comments 컬렉션을 find한 후, 결과값이 있으면 delete 아니면 에러
