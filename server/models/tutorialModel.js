const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;

const tutorialSchema = new mongoose.Schema(
  {
    url: { type: String },
    img: { type: String },
    title: { type: String, required: true },
    description: { type: String },
    user: { type: ObjectId, required: true },
  },
  {
    timestamps: true,
  }
);

const Tutorial = mongoose.model("tutorial", tutorialSchema);

module.exports = Tutorial;
