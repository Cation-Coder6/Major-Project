const express = require("express");
const router = express.Router();

const promptControllers = require("../controllers/prompt/index");

router.post("/prompts", promptControllers.createPrompt);
router.get("/prompts", promptControllers.getAllPrompts);
router.patch("/prompts/:id", promptControllers.updatePrompt);
router.delete("/prompts/:id", promptControllers.deletePrompt);

module.exports = router;
