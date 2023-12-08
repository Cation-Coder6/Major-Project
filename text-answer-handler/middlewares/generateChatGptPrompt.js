const getGptResponse = require("../utils/getGptResponse");

const generateChatGptPrompt = async (req, res, next) => {
  const data = req.body.dataPromptForGpt;
  const subject = req.body.subject;

  if (!subject)
    res.status(400).json({
      error: "Please send subject name also in 'subject' field",
    });

  let prompt = `Subject: ${subject}\n\nPlease read and grade the following student answers out of 5 based on accuracy, relevance, and completeness. Provide the results in a JSON format like [{question: "question text", roll1: marks, roll2: marks, ...}].\n\n`;

  data.forEach((item) => {
    const question = item.Question;
    prompt += `Question: ${question}\n`;

    Object.keys(item).forEach((key) => {
      if (key !== "Question") {
        const answer = item[key];
        prompt += `   - ${key}: "${answer}"\n`;
      }
    });

    prompt += "\n";
  });
  console.log("Hello part 2" + prompt);
  req.body.prompt = prompt;
  next();
};

module.exports = generateChatGptPrompt;
