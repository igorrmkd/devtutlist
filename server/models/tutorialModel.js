const mongoose = require("mongoose");

const tutorialSchema = new mongoose.Schema(
  {
    img: { type: String },
    title: { type: String, required: true },
    description: { type: String },
  },
  {
    timestamps: true,
  }
);

const Tutorial = mongoose.model("tutorial", tutorialSchema);

module.exports = Tutorial;
