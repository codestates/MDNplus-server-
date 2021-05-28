const Questions = require("../../models/Questions");

// 댓글에 좋아요 Up And Down 기능

module.exports = async (req, res) => {
  console.log("좋아요 처리해주는 요청 들어옴");
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { userId } = req.session;
    const { questionId, like, isLike } = req.body;
    console.log(userId, questionId, like, isLike);
    //로그인 안해도 like할 수 있으면 sessionId 필요없음
    if (!userId) {
      return res.status(400).send("not authoirzation");
    }
    //findOneAndUpdate는 doc을 리턴하지만, updateOne은 doc을 리턴하지 않는다.
    //=> 바뀐 데이터를 전송해주기 위해서 findOneAndUpdate사용후 new:true 넣어주기
    const question = await Questions.findOneAndUpdate(
      { _id: questionId },
      { like, isLike },
      // { $inc: { like } }, // 기존like + 요청like, 현재 프로젝트에서는 적용안하기로!
      { new: true }
    );
    return res.status(200).send(question);
  } catch (err) {
    res.status(500).send(err);
  }
};
