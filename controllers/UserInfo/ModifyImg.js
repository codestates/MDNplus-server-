const Users = require("../../models/Users");

module.exports = async (req, res) => {
  try {
    const { userId } = req.session;
    const { image } = req.body;

    if (!userId) {
      return res.status(400).send("not authorization");
    }

    const user = await Users.findOneAndUpdate(
      { _id: userId },
      { image: img },
      { new: true }
    );

    res.status(200).send(user);
  } catch (err) {
    res.status(500).send(err);
  }
};
