const formatSheetDataForGpt = (req, res, next) => {
  const sheetData = req.body.sheet_data;
  const dataPromptForGpt = [];
  const questions = {};

  const subjectiveQuestionRegex = /\(?\s*less than \d+ words\s*\)?/i;

  sheetData.forEach((entry) => {
    for (let key in entry) {
      if (subjectiveQuestionRegex.test(key)) {
        if (!questions[key]) {
          questions[key] = {};
        }
        questions[key][entry["Roll Number"]] = entry[key] || null;
      }
    }
  });

  // Construct the output for subjective questions
  for (let question in questions) {
    const questionObj = { Question: question };
    for (let rollNumber in questions[question]) {
      questionObj[rollNumber] = questions[question][rollNumber];
    }
    dataPromptForGpt.push(questionObj);
  }

  if (dataPromptForGpt.length == 0)
    res.status(400).json({ error: "No subjective questions found" });
  console.log("Hello");
  req.body.dataPromptForGpt = dataPromptForGpt;
  next();
};

module.exports = {
  formatSheetDataForGpt,
};
