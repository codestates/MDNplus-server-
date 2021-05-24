const Questions = require("../../models/Questions");
const Comments = require("../../models/Comments");
const Users = require("../../models/Users");
// My helpdesk page 조회
// users, questions, comments, tags
// 내가 작성한 질문 , 내가 작성한 댓글 따로 보내주기.

module.exports = async (req, res) => {
  console.log('마이페이지 요청 들어옴')
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; //나중에 세션 아이디로 대체
    const { userId } = req.session;
    console.log(">>>세션 아이디>>>",userId)

    if (!userId) {
      return res.status(400).send("not authorization");
    }
    const user = await Users.findOne(
      { _id: userId },
      { nickName: 1, image: 1 }
    );
    const questions = await Questions.find({ userId });
    const comments = await Comments.find({ userId }).populate("questionId", {
      title: 1,
    });

    res.status(201).send({ user, questions, comments });
  } catch (err) {
    res.status(500).send(err);
  }
};
