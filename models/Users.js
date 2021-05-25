const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  // type: { type: String, required: true },
  //불필요해 보임, 애초에 조회시 kakao는 kakakId로 조회, github은 githubId로 조회한다.
  nickName: { type: String, default: null },
  kakaoId: { type: String, default: null },
  githubId: { type: String, default: null },
  image: { type: String, data: Buffer, default: null },
});

module.exports = model("users", UserSchema);
