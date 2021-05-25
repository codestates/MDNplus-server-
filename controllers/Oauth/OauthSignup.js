const Users = require("../../models/Users");

module.exports = async (req, res) => {
  try {
    console.log('닉네임 저장하는 요청 들어옴')
    // const userId = "60a5aa8ad96cdef21153faec"; // sessionId
    const { nickName } = req.body;
    const { userId } = req.session;
    console.log(nickName, userId)

    if (!userId) {
      return res.status(400).send("not authorization");
    }
    //조회해서 nick을 뿌려준다.
    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { nickName },
      { new: true }
    );
    console.log(user)
    res.status(200).send({ user });
  } catch (err) {
    res.status(500).send(err);
  }
};
