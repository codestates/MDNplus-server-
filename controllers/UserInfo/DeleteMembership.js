module.exports = async (req, res) => {
  if (!req.session.userId) {
    return res.status(400).send("not authorized");
  }
  req.session.destroy();
  res.status(200).send("successful membership withdrawal");
};
