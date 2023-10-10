const Prompt = require("../../models/Prompt");

const getAllPrompts = async (req, res) => {
  try {
    const prompts = await Prompt.find({});
    res.status(200).send(prompts);
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = getAllPrompts;
