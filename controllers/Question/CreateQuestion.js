const Questions = require("../../models/Questions");
const Tags = require("../../models/Tags");

// 질문 작성 기능

module.exports = async (req, res) => {
  try {
    const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { title, body, tags } = req.body;
    //sessionId가 없다면 에러
    if (!userId) {
      return res.status(400).send("not authorization");
    }
    //title, body 둘중 하나라도 없으면 에러
    if (!title || !body) {
      return res.status(400).send("title and body are required");
    }
    const question = new Questions({ title, body, tags, userId });
    // console.log(">>>", question);

    // 질문 데이터베이스에 생성
    await question.save();
    // 태그가 있다면, 태그를 tags 컬렉션에 각각 생성한다. => 나중에 tag로 검색 기능 만들기위해
    if (tags.length !== 0) {
      await tags.map((tagName) => {
        Tags.create({ tagName, questionId: question._id });
      });
      res.status(201).send("질문과 태그가 등록되었습니다.");
    }
    res.status(201).send("질문이 등록되었습니다.");
  } catch (err) {
    res.status(500).send(err);
  }
};

//위 코드 시간 날때 수정하기. => create 사용하는 이유중 하나는 여러객체를 한번에 db에 저장할 수 있다. 현재는 map으로 하나씩 저장을 하기 때문에 수정해야함.
