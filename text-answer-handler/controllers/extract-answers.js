const getGPTResponse = require("../utils/gptcaller");

const extractAnswer = async (req, res) => {
  try {
    const jsonArray = req.body;

    // Initialize an array to hold the formatted results
    let formattedResults = [];

    // Regular expression to match questions ending with "(less than N words)"
    const questionRegex = /\(less than \d+ words\)$/;

    // Iterate over each entry in the JSON array
    jsonArray.forEach((entry) => {
      let result = {
        "Roll Number": entry["Roll Number"],
        Score: entry["Score"],
      };

      // Iterate over each property in the entry
      for (const [question, answer] of Object.entries(entry)) {
        // Check if the question matches the regex pattern
        if (questionRegex.test(question)) {
          result[question] = answer;
        }
      }

      // Add the formatted result to the results array
      formattedResults.push(result);
    });

    // Send the formatted results as a response
    console.log(formattedResults);

    const prefixPrompt =
      ' Here is a response from a Google form where each entry looks like this : [ { "Roll Number": Sample Roll number [Int],            "Score": Sample Score [Float], //  final score of the student            "Sample Question 1 (less than N words)": "Sample Subjective answer to the questions",            "Sample Question 2. (less than N words)": "Sample Subjective answer to the question",            "Sample Question 3. (less than N words)": "Sample Subjective answer to the question"        }    ]        Your Job is to evaluate the responses and return a response of the format :         [        {            "Roll Number": 1,            "Score": Sample Score [Int], // Per Question Marks            "Sample Question 1 (less than N words)": "Sample Subjective answer to the questions",            "Sample Question 2. (less than N words)": "Sample Subjective answer to the question",            "Sample Question 3. (less than N words)": "Sample Subjective answer to the question"            "total": [Mark Awarderd Q1] + [Mark Awarderd Q2] + [Mark Awarderd Q3], // Calcualted Total Marks based on your evaluation            "markingReview": {                "Sample Question 1": [Marks Awarded Q1] - [Sample Comment on why this marks for awarded]",                "Sample Question 2": [Marks Awarded Q2] - [Sample Comment on why this marks for awarded]",                "Sample Question 3": [Marks Awarded Q3] - [Sample Comment on why this marks for awarded]"            }        },            Here is the Input file :';

    const suffixPrompt =
      "Note : When you encounter (less than N words) appended after any question it means the question is Subjective Else One word.    Sample Comment phrases you can use and respective marks:    1. Incomplete and Incorrect. [Marks - 0]    2. Partially Correct. [Marks - 1/2 * Marks per question]    3. Unrealated Answer [Marks - 0]    4. Irrelavent content. [Marks - 0]    5. Captures the Core idea but fails to expand.[Marks - 3/4 * Marks per question]    6. Answer too short. [Marks - 1/2 * Marks per question]        Generate the Output in the illustated format response based on the directions. No neeed of explanation simply generate an response in the given format. Strictly Dont Add any extra text other than the response.";

    getGPTResponse(prefixPrompt + formattedResults + suffixPrompt)
      .then((response) => {
        console.log("GPT-3 Response:", response);
        res.status(200).json(response);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
};

module.exports = extractAnswer;
