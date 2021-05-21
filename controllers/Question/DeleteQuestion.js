const Questions = require("../../models/Questions");

// 질문 삭제 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { questionId } = req.body;

    if (!userId) {
      return res.status(400).send("not authorization");
    }
    await Questions.deleteOne({ _id: questionId });

    res.status(400).send("질문이 삭제되었습니다");
  } catch (err) {
    res.status(500).send(err);
  }
};
