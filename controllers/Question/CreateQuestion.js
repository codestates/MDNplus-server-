const Questions = require("../../models/Questions");
const Tags = require("../../models/Tags");

// 질문 작성 기능

module.exports = async (req, res) => {
  console.log("새 질문 저장 요청 들어옴");

  try {
    // const userId = "60adf7d76612e6172a4f1aea"; // sessionId
    const { userId } = req.session;
    const { title, body, tags, pureBody } = req.body;

    console.log(userId, title, body, tags);
    //sessionId가 없다면 에러
    if (!userId) {
      return res.status(401).send("not authorization");
    }
    //title, body 둘중 하나라도 없으면 에러
    if (!title || !body) {
      return res.status(400).send("title and body are required");
    }
    const question = new Questions({ title, body, tags, userId, pureBody });
    console.log(">>>", question);

    // 질문 데이터베이스에 생성
    await question.save();
    // 태그가 있다면, 태그를 tags 컬렉션에 각각 생성한다. => 나중에 tag로 검색 기능 만들기위해
    if (tags.length !== 0) {
      await tags.map((tagName) => {
        Tags.create({ tagName, questionId: question._id });
      });
    }
    res.status(201).send("created the question.");
  } catch (err) {
    res.status(500).send(err);
  }
};

//위 코드 시간 날때 수정하기. => create 사용하는 이유중 하나는 여러객체를 한번에 db에 저장할 수 있다. 현재는 map으로 하나씩 저장을 하기 때문에 수정해야함.
