const { Schema, model } = require("mongoose");

const TagSchema = new Schema({
  tagName: { type: String },
  //관계 짓기
  questions: { type: Schema.Types.ObjectId, ref: "questions" },
});

module.exports = model("tags", TagSchema);
