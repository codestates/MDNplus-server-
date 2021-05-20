const { Schema, model } = require("mongoose");

const UserSchema = new Schema({
  type: { type: String, required: true },
  nickName: { type: String, required: true, unique: true },
  kakaoId: { type: String, unique: true },
  githubId: { type: String, unique: true },
  image: { type: String, data: Buffer },
});

module.exports = model("users", UserSchema);
