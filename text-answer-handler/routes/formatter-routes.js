const express = require("express");
const router = express.Router();
const extractAnswer = require("../controllers/extract-answers");
const { formatSheetDataForGpt } = require('../middlewares/formatSheetDataForGpt');

router.post("/extract-answers", extractAnswer);
router.post('/get-feedback', formatSheetDataForGpt)

module.exports = router;
