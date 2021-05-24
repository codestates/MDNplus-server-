const Users = require("../../models/Users");

module.exports = async (req, res) => {
  console.log('세팅페이지에 닉네임 받아오는 요청 들어옴')
  try {
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { userId } = req.session;
    if (!userId) {
      return res.status(400).send("not authorization");
    }
    const user = await Users.findById(userId);
    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
