const getGPTResponse = require("../../utils/gptcaller");

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
    console.log("finalPrompt:", req.body);

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
    const prefix =
      'Your Job is to generate questions. Based on a Prompt provided to you. The prompt will include the number of Questions you need to genrate and the Topic of questions.    The questions you genrate need to be retured in a particular format. This format is really important to adher to cuz this will be fed to google App Script for Google forms.                Here is a sample response for prompt : " Genrate 10 questions on miscellaneous topic. Include 3 subjective questions"  [        {            "type": "multipleChoice",            "title": "What is the smallest prime number?",            "options": ["1", "2", "3", "4"],            "answer": "2",            "required": true,            "points": 1,        },        {            "type": "multipleChoice",            "title": "Which planet is known as the Red Planet?",            "options": ["Earth", "Venus", "Mars", "Jupiter"],            "answer": "Mars",            "required": true,            "points": 1,                    },    Prompt is :';
    const suffix =
      'Note :     1. Strictly dont generate any other text other then the reponse of the given format.    2. By default all subjective questions are "5" points and MCQs are "1" point.    3. All questions are required : "true".    4. Generate only MCQ questions until asked explicitly for Subjective.    5. Subjective questions are of type "text" and end with with "(less than 100 words)". ';
    getGPTResponse(prefix + req.body.prompt + suffix)
      .then((response) => {
        try {
          // Check if the response is a string
          if (typeof response === "string") {
            const parsedResponse = JSON.parse(response);

            if (Array.isArray(parsedResponse)) {
              res.status(200).json(parsedResponse);
            } else {
              res.status(400).send("Invalid response format");
            }
          } else {
            res.status(400).send("Invalid response format");
          }
        } catch (error) {
          res.status(400).send("Invalid JSON format");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = suffixAdder;
