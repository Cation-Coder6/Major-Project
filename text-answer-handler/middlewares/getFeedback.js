const getGptResponse = require("../utils/getGptResponse");

const getFeedback = async (req, res, next) => {
  const gptPrompt = req.body.prompt;
  try {
    console.log("Hey this is the last call");
    const response = await getGptResponse(gptPrompt);
    req.body.feedback = response;
    res.status(200).json(response);
  } catch (err) {
    next(err);
  }
};
module.exports = getFeedback;
