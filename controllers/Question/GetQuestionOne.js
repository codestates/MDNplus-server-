const Questions = require("../../models/Questions");
const Comments = require("../../models/Comments");

//질문을 클릭했을 때, page 조회

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId

    const { questionid } = req.params;

    if (!userId) {
      return res.status(400).send("not authorization");
    }
    const comments = await Comments.find({ questionId: questionid });
    const question = await Questions.findById(questionid);

    res.status(200).send({ question, comments });
  } catch (err) {
    res.status(500).send(err);
  }
};
