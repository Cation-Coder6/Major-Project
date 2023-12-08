const express = require("express");
const router = express.Router();
const extractAnswer = require("../controllers/extract-answers");
const { formatSheetDataForGpt } = require('../middlewares/formatSheetData');
const generateChatGptPrompt = require('../middlewares/generateChatGptPrompt');

router.post("/extract-answers", extractAnswer);
router.post('/get-feedback', [formatSheetDataForGpt, generateChatGptPrompt])

module.exports = router;
