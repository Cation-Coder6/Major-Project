const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set
});

async function getGPTResponse(prompt) {
  try {
    const params = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion = await openai.chat.completions.create(params);

    return chatCompletion.choices[0].message.content;
    console.log(
      "This is the chatCompletion:",
      chatCompletion.choices[0].message.content
    );

    if (
      chatCompletion &&
      chatCompletion.data &&
      chatCompletion.data.choices &&
      chatCompletion.data.choices.length > 0
    ) {
      const responseMessage = chatCompletion.data.choices[0].message;
      if (responseMessage && responseMessage.content) {
        return responseMessage.content; // Return the response content
      } else {
        console.log(
          "No content in message:",
          JSON.stringify(chatCompletion.data.choices[0], null, 2)
        );
        return null;
      }
    } else {
      console.log("No valid data found in response");
      return null;
    }
  } catch (error) {
    console.error("Error in calling OpenAI Chat API:", error);
    throw error; // Propagate the error for further handling
  }
}

module.exports = getGPTResponse;
