module.exports = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).send("not authorized");
  }
  req.session.destroy();
  res.status(200).send("logout successful");
};
