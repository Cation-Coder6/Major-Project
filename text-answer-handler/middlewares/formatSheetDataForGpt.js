const formatSheetDataForGpt = (req, res, next) => {
  const sheetData = req.body;
  const dataPromptForGpt = [];
  const questions = {};

  sheetData.forEach((entry) => {
      for (let key in entry) {
          if (key !== 'Timestamp' && key !== 'Email Address' && key !== 'Score' && key !== 'Roll Number') {
              if (!questions[key]) {
                  questions[key] = {};
              }
              questions[key][entry['Roll Number']] = entry[key] || null;
          }
      }
  });

  for (let question in questions) {
      const questionObj = { Question: question };
      for (let rollNumber in questions[question]) {
          questionObj[rollNumber] = questions[question][rollNumber];
      }
      dataPromptForGpt.push(questionObj);
  }

  req.body.dataPromptForGpt = dataPromptForGpt;
  return res.status(200).json(dataPromptForGpt);
};

module.exports = {
  formatSheetDataForGpt,
};
