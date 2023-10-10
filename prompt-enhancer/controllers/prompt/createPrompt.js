const Prompt = require("../../models/Prompt");

const createPrompt = async (req, res) => {
  try {
    // If the incoming status is 1
    if (req.body.status === 1) {
      // Update all documents with the same promptType to have a status of 0
      await Prompt.updateMany(
        { promptType: req.body.promptType },
        { status: 0 }
      );
    }

    // Save the new prompt
    const prompt = new Prompt(req.body);
    await prompt.save();

    res.status(201).send(prompt);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = createPrompt;
