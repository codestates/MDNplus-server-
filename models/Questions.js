const { Schema, model } = require("mongoose");

const QuestionSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    pureBody: { type: String },
    tags: { type: Array },
    commentCount: { type: Number, default: 0 },
    like: { type: Number, default: 0 },
    //관계 짓기
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    // tagId: { type: Schema.Types.ObjectId, ref: "tags" }, 불필요해보임
    isLike: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("questions", QuestionSchema);
