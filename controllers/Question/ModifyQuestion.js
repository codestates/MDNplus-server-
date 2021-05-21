const Questions = require("../../models/Questions");
const Tags = require("../../models/Tags");

// 질문 수정 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { questionId, title, body, tags } = req.body;
    //sessionId가 없다면 에러
    if (!userId) {
      return res.status(400).send("not authorization");
    }
    //title, body 둘중 하나라도 없으면 에러
    if (!title || !body) {
      return res.status(400).send("title and body are required");
    }
    //수정된 내용 questions 컬렉션에 업데이트
    const comment = await Questions.findOneAndUpdate(
      { _id: questionId },
      { title, body, tags },
      { new: true }
    );
    //questionId를 추적하여 이전의 태그를 모두 삭제
    await Tags.deleteMany({ questionId });

    //태그가 있다면, 수정된 태그를 tags 컬렉션에 업데이트
    if (tags.length !== 0) {
      await tags.map((tagName) => {
        Tags.create({ tagName, questionId });
      });
    }
    res.status(200).send(comment);
  } catch (err) {
    res.status(500).send(err);
  }
};

//tag는 업데이트가 아니라 지우고 다시 생성

//기존의 questionId를 추적해서 바꾸기에는
// 갯수가 달라져버리면 업데이트가 제대로 되지않는다.
