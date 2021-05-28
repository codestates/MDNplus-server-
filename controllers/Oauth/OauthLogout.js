module.exports = async (req, res) => {
  console.log('로그아웃 요청 들어옴')
  console.log(req.session)
  if (!req.session.userId) {
    return res.status(401).send("not authorized");
  }
  req.session.destroy();
  res.status(200).send("logout successful");
};
