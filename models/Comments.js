const { Schema, model } = require("mongoose");

const CommentSchema = new Schema(
  {
    content: { type: String, required: true },
    pureContent: { type: String },
    like: { type: Number, default: 0 },
    //관계 짓기
    userId: { type: Schema.Types.ObjectId, ref: "users" },
    questionId: { type: Schema.Types.ObjectId, ref: "questions" },
    isLike: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = model("comments", CommentSchema);
