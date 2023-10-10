const Prompt = require("../../models/Prompt");

const updatePromptById = async (req, res) => {
  if (!req.params.id) {
    return res.status(400).send({ message: "ID parameter is required" });
  }

  try {
    // Fetch the current state of the prompt
    const currentPrompt = await Prompt.findById(req.params.id);
    if (!currentPrompt) {
      return res.status(404).send({ message: "Prompt not found" });
    }

    // If the incoming status is 1
    if (req.body.status === 1) {
      // Update all other documents with the same promptFeature to have a status of 0
      await Prompt.updateMany(
        {
          promptType: currentPrompt.promptType,
          _id: { $ne: req.params.id }, // Excluding the current prompt from the update
        },
        { status: 0 }
      );
    }

    // Remove promptType from req.body to prevent changing it
    delete req.body.promptType;

    // Update the target prompt
    const prompt = await Prompt.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!prompt) {
      return res.status(404).send({ message: "Prompt not found after update" });
    }

    res.send(prompt);
  } catch (error) {
    res.status(400).send(error);
  }
};

module.exports = updatePromptById;
