const Questions = require("../../models/Questions");
const Comments = require("../../models/Comments");

// My helpdesk page 조회
// users, questions, comments, tags
// 내가 작성한 질문 , 내가 작성한 댓글 따로 보내주기.

module.exports = async (req, res) => {
  console.log("My helpdesk page 조회");
  const sessionId = "60a5aa8ad96cdef21153faec"; //나중에 세션 아이디로 대체

  let question = await questions
    .find({ userId: sessionId })
    .populate("userId")
    .populate("tagId");

  //   let comment = await comments;

  res.status(201).send({ question });
};
