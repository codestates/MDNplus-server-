const Comments = require("../../models/Comments");

//질문을 클릭했을 때, page 조회

module.exports = async (req, res) => {
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { userId } = req.session;
    const { commentid } = req.params;

    const question = await Comments.findById(commentid).populate({
      path: "questionId",
      populate: [{ path: "userId" }], //questionId안의 userId의 데이터도 모두 보이게 하기 위해서 path사용
    });
    const comments = await Comments.find({
      questionId: question.questionId._id,
    }).populate("userId");
    //check.userId와 userId의 값은 같지만 String으로 묶어준 이유는 type이 다르기 때문이다. String으로 묶어주지 않으면 false가 뜬다.
    //console.log(typeof check.userId) //object
    //console.log(typeof userId) //string ,현재는 string이지만, 실제 세션ID로 넣어주면 잘 모름.
    const isMyComment =
      String(comments.userId) === String(userId) ? true : false;

    res
      .status(200)
      .send({ question: question.questionId, comments, isMyComment });
  } catch (err) {
    res.status(500).send(err);
  }
};
