const Comments = require("../../models/Comments");

module.exports = async (req, res) => {
  try {
    const { commentId, like } = req.body;
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    //로그인 안해도 like할 수 있으면 sessionId 필요없음
    if (!userId) {
      return res.status(400).send("not authoirzation");
    }
    //findOneAndUpdate는 doc을 리턴하지만, updateOne은 doc을 리턴하지 않는다.
    //=> 바뀐 데이터를 전송해주기 위해서 findOneAndUpdate사용후 new:true 넣어주기
    const comment = await Comments.findOneAndUpdate(
      { _id: commentId },
      { like },
      // { $inc: { like } }, // 기존like + 요청like, 현재 프로젝트에서는 적용안하기로!
      { new: true }
    );
    res.status(400).send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};
