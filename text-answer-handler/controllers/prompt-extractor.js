const extractAnswer = async (req, res) => {
  try {
    const data = req.body;

    const filteredData = data.map((entry) => {
      let extracted = {
        score: entry.Score,
        rollNumber: entry["Roll Number"],
      };

      // Extract questions that end with "(less than n words)"
      for (let key in entry) {
        if (key.includes("( less than ") && key.includes(" words)")) {
          extracted[key] = entry[key];
        }
      }

      return extracted;
    });
    return res.json(filteredData);
  } catch (error) {
    console.error("Error:", error); // Log any errors
    return res
      .status(500)
      .json({ error: error.message || "Internal server error" });
  }
};

module.exports = extractAnswer;
