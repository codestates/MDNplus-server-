const Users = require("../../models/Users");

module.exports = async (req, res) => {
  const userId = "60a5aa8ad96cdef21153faec"; // sessionId
  const { nickName } = req.body;
  // const { userId } = req.session;
  if (!userId) {
    return res.status(400).send("not authorization");
  }
  if (!nickName) {
    return res.status(400).send("nickName is required");
  }
  const user = await Users.findOneAndUpdate(
    { _id: userId },
    { nickName },
    { new: true }
  );
  res.status(200).send(user);
};
