const Users = require("../../models/Users");
module.exports = async (req, res) => {
  console.log('이미지 업데이트 요청 들어옴')
  const { userId } = req.session;
  const {img} = req.body

  if(!userId){
    return res.status(400).send("not authorization")
  }

  const user = await Users.findOneAndUpdate({_id:userId},{image:img},{new:true})

  res.status(200).send(user)
};