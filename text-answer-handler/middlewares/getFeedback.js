const getGptResponse = require('../utils/getGptResponse');

const getFeedback = async (req, res, next) => {
    const gptPrompt = req.body.prompt;
    try {
        const response = await getGptResponse(gptPrompt);
        req.body.feedback = response;
        next();
    } catch (err) {
        next(err);
    }
};
