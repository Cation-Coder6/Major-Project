const finalSheetFormatter = async (req, res, next) => {
  const originalPayload = req.body.sheet_data; // Array of student answers
  const gptFeedback = req.body.feedback; // Array of feedback objects

  // Validate the input data
  if (!Array.isArray(originalPayload) || !Array.isArray(gptFeedback)) {
    console.error("Invalid input data format:", {
      originalPayload,
      gptFeedback,
    });
    return res.status(400).json({ error: "Invalid input data format." });
  }

  // Initialize an object to store the combined data
  const combinedData = {};

  // Process the original payload
  originalPayload.forEach((entry) => {
    const rollNumber = entry["Roll Number"].toString();
    combinedData[rollNumber] = {
      "Roll Number": rollNumber,
      Score: entry["Score"],
      total: 0,
      markingReview: {},
    };

    for (let key in entry) {
      if (
        !["Timestamp", "Email Address", "Score", "Roll Number"].includes(key)
      ) {
        combinedData[rollNumber][key] = entry[key];
        combinedData[rollNumber]["markingReview"][key] = 0;
      }
    }
  });

  // Process the GPT feedback
  gptFeedback.forEach((feedbackItem) => {
    const question = feedbackItem.question;
    for (let rollNumber in feedbackItem) {
      if (rollNumber !== "question") {
        const rollNumberStr = rollNumber.toString();
        if (combinedData[rollNumberStr]) {
          const score = feedbackItem[rollNumber];
          combinedData[rollNumberStr]["total"] += score;
          if (question in combinedData[rollNumberStr]["markingReview"]) {
            combinedData[rollNumberStr]["markingReview"][question] = score;
          }
        }
      }
    }
  });

  // Function to process data for sheet
  const processDataForSheet = (dataToPrepare) => {
    return dataToPrepare.map((entry) => {
      const {
        "Roll Number": rollNumber,
        Score,
        total,
        markingReview,
        ...answers
      } = entry;

      return {
        "Roll Number": rollNumber,
        Score: Score + total, // Assuming you want to add these together
        total: total,
        ...answers,
      };
    });
  };

  // Call processDataForSheet with combined data
  const preparedData = processDataForSheet(Object.values(combinedData));
  res.status(200).json(combinedData);
};

module.exports = finalSheetFormatter;
