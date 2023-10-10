const express = require("express");
const router = express.Router();
const suffixAdder = require("../controllers/suffix/suffixAdder");

router.post("/promptAdd", suffixAdder);

module.exports = suffixAdder;
