const questions = require("../../models/Questions");

module.exports = async (req, res) => {
  console.log("알맞은 코드를 작성해주세요11");
  //question 생성하는 코드 구현
  const question = new questions(req.body);
  try {
    await question.save();
    await res.status(201).send(question);
  } catch (err) {
    res.status(400).send(err);
  }
};
