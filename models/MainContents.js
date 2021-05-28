const { Schema, model } = require("mongoose");

const MainContentSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String },
    pureBody: { type: String },
    count: { type: Number, required: true, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("mainContents", MainContentSchema);

//실제 컬렉션에서는 대문자를 넣으면 안됨. 값이 안뜸.
