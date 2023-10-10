const mongoose = require("mongoose");

const PromptSchema = new mongoose.Schema({
  prompt: {
    type: String,
    required: [true, "Prompt Required."],
  },
  promptType: {
    type: String,
    required: [true, "Prompt feature is required."],
    enum: {
      values: ["suffix", "prefix"],
      message: 'Prompt feature should be either "suffix" or "prefix".',
    },
  },
  status: {
    type: Number,
    required: [true, "Status is required."],
    enum: {
      values: [0, 1],
      message: "Status should be either 0 or 1.",
    },
    default: 0,
  },
});

module.exports = mongoose.model("Prompt", PromptSchema);
