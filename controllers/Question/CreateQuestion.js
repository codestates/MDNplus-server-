const Questions = require("../../models/Questions");
const Tags = require("../../models/Tags");

// 질문 생성 코드
module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { title, body, tags } = req.body;

    if (!title || !body) {
      return res.status(400).send("title and body are required");
    }
    const question = new Questions({ title, body, tags, userId });
    // console.log(">>>", question);

    await question.save(); // 질문 데이터베이스에 생성
    if (tags.length !== 0) {
      // 태그가 있다면
      await tags.map((tagName) => {
        Tags.create({ tagName, questionId: question._id });
      }); //방금 작성한 질문의 questionId와 tag를 tags 컬렉션에 생성한다. => 나중에 tag로 검색 가능.
      res.status(201).send("질문과 태그가 등록되었습니다.");
    }
    res.status(201).send("질문이 등록되었습니다.");
  } catch (err) {
    res.status(500).send("서버문제");
  }
};
