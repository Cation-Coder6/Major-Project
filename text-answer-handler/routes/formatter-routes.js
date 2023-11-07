const express = require("express");
const router = express.Router();
const extractAnswer = require("../controllers/extract-answers");

router.post("/extract-answers", extractAnswer);

module.exports = router;
