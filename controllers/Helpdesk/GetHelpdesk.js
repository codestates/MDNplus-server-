const Questions = require("../../models/Questions");
const Comments = require("../../models/Comments");

module.exports = async (req, res) => {
  console.log('헬프데스크 메인페이지에 뿌려주는 요청 들어옴')
  try {
    // const latestQuestion = await Questions.find()
    //   .sort("-createdAt") //createdAt시간으로 제일 최신 질문이 위로 올 수 있게 정렬!
    //   .populate("userId");
    // const popularityQuestion = await Questions.find()
    //   .sort("-like") //like를 기준으로 like가 제일 많은 질문이 위로 올 수 있게 정렬
    //   .populate("userId");

    const allQuestions = await Questions.find().populate("userId")

    res.status(200).send({ allQuestions });
  } catch (err) {
    res.status(500).send(err);
  }
};
