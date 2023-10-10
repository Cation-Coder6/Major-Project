const Prompt = require("../../models/Prompt");

const suffixAdder = async (req, res) => {
  // Check if req.body exists and is not empty
  if (!req.body || Object.keys(req.body).length === 0) {
    return res.status(400).json({ message: "Request body cannot be empty." });
  }

  try {
    // Fetch the suffix prompt
    const suffixPrompt = await Prompt.findOne({
      promptType: "suffix",
      status: 1,
    });

    // Fetch the prefix prompt
    const prefixPrompt = await Prompt.findOne({
      promptType: "prefix",
      status: 1,
    });

    let finalPrompt = req.body.prompt;

    if (prefixPrompt) {
      finalPrompt = prefixPrompt.prompt + " " + finalPrompt;
    }

    if (suffixPrompt) {
      finalPrompt += " " + suffixPrompt.prompt;
    }

    // Check if neither prefix nor suffix was found
    if (!prefixPrompt && !suffixPrompt) {
      return res.status(404).json({
        message: "Neither prefix nor suffix prompt found with status 1",
      });
    }

    return res.status(200).json({
      originalPrompt: req.body.prompt,
      prefixPrompt: prefixPrompt ? prefixPrompt.prompt : null,
      suffixPrompt: suffixPrompt ? suffixPrompt.prompt : null,
      finalPrompt: finalPrompt,
    });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = suffixAdder;
