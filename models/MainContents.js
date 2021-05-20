const { Schema, model } = require("mongoose");

const MainContentSchema = new Schema(
  {
    title: { type: String, required: true },
    body: { type: String, required: true },
    count: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = model("mainContents", MainContentSchema);
