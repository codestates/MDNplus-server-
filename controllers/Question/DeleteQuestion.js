const Questions = require("../../models/Questions");
const Comments = require("../../models/Comments");
const Tags = require("../../models/Tags");
// 질문 삭제 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { questionId } = req.body;

    if (!userId) {
      return res.status(400).send("not authorization");
    }
    await Questions.deleteOne({ _id: questionId });
    await Comments.deleteMany({ questionId });
    await Tags.deleteMany({ questionId });
    res.status(400).send("질문이 삭제되었습니다");
  } catch (err) {
    res.status(500).send(err);
  }
};

//+++++++++++++++ 추가해야함.
// userId로 questions 컬렉션을 find한 후, 결과값이 있으면 delete 아니면 에러
//questions에 연결되어있는 댓글도 모두 삭제 => 조건주기
//tag도 모두 삭제 => 조건주기
