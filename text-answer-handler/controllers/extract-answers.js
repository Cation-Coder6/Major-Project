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
    res.status(200).json(formattedResults);
  } catch (error) {
    console.error("Error processing the request:", error);
    res.status(500).send("An error occurred while processing the request.");
  }
};

module.exports = extractAnswer;
