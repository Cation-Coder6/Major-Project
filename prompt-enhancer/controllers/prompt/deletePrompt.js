const Prompt = require("../../models/Prompt");

const deletePromptById = async (req, res) => {
  try {
    const prompt = await Prompt.findByIdAndDelete(req.params.id);
    if (!prompt) {
      return res.status(404).send({ message: "Prompt not found!" });
    }
    res.send(prompt);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = deletePromptById;
