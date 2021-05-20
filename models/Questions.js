const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    like: { type: Number, default: 0 },
    //관계 짓기
    usersId: { type: Schema.Types.ObjectId, ref: "users" },
    tagsId: { type: Schema.Types.ObjectId, ref: "tags" },
  },
  { timestamps: true }
);

module.exports = model("questions", QuestionSchema);
