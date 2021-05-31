const MainContents = require("../../models/MainContents");
const Questions = require("../../models/Questions");

module.exports = async (req, res) => {
  try {
    const { type, content } = req.body; //type에는 타이틀검색인지 바디검색인지 태그검색인지 판별할 수 있는 스트링

    // 타입요청이 없으면 에러
    if (!type) {
      return res.status(400).send("type is required");
    }
    //검색 내용이 없으면 에러
    if (!content) {
      return res.status(400).send("content is required");
    }
    //전체로 검색시 응답
    if (type === "전체") {
      const mainContent = await MainContents.find({
        $or: [
          { title: { $regex: content, $options: "i" } },
          { body: { $regex: content, $options: "i" } },
        ],
      });
      const helpdeskContent = await Questions.find({
        $or: [
          { title: { $regex: content, $options: "i" } },
          { body: { $regex: content, $options: "i" } },
          { tags: { $regex: content, $options: "i" } },
        ],
      }).populate("userId");
      return res.status(200).send({ mainContent, helpdeskContent });
    }
    //제목으로 검색시 응답
    if (type === "제목") {
      const mainContent = await MainContents.find({
        title: { $regex: content, $options: "i" },
      });

      const helpdeskContent = await Questions.find({
        title: { $regex: content, $options: "i" },
      }).populate("userId");

      return res.status(200).send({ mainContent, helpdeskContent });
    }
    //내용으로 검색시 응답
    if (type === "내용") {
      const mainContent = await MainContents.find({
        body: { $regex: content, $options: "i" },
      });
      const helpdeskContent = await Questions.find({
        body: { $regex: content, $options: "i" },
      }).populate("userId");

      return res.status(200).send({ mainContent, helpdeskContent });
    }
    //태그로 검색시 응답
    if (type === "태그") {
      // const tags = await Tags.find({
      //   tagName: { $regex: content, $options: "i" },
      // }).populate({ path: "questionId", populate: [{ path: "userId" }] });
      // const question = await tags.map((el) => {
      //   return el.questionId;
      // });
      const helpdeskContent = await Questions.find({
        tags: { $regex: content, $options: "i" },
      });
      res.status(200).send({ helpdeskContent });
    }
  } catch (err) {
    res.status(500).send(err);
  }
};

//$regex : "s" --> s가 포함되어있는것을 찾기
