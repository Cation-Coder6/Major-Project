const OpenAI = require("openai");

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Ensure your API key is set
});

async function getGptResponse(prompt) {
  try {
    const params = {
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
    };
    const chatCompletion = await openai.chat.completions.create(params);

    if (chatCompletion && chatCompletion.choices && chatCompletion.choices.length > 0) {
      const responseContent = chatCompletion.choices[0].message.content;
      if (responseContent) {
        try {
          // First, try parsing the entire response
          return JSON.parse(responseContent);
        } catch {
          // If parsing fails, attempt to extract and parse JSON part
          const jsonMatch = responseContent.match(/\{[\s\S]*\}|\[[\s\S]*\]/);
          if (jsonMatch) {
            try {
              const jsonResponse = JSON.parse(jsonMatch[0]);
              return jsonResponse; // Return the parsed JSON object/array
            } catch (jsonParseError) {
              console.error("Found JSON-like content, but unable to parse:", jsonParseError);
              // Handle the JSON parsing error
              return null;
            }
          } else {
            console.error("No JSON found in response");
            // Handle the case where no JSON is found
            return null;
          }
        }
      } else {
        console.error("No content in message:", JSON.stringify(chatCompletion.choices[0], null, 2));
        return null;
      }
    } else {
      console.error("No valid data found in response");
      return null;
    }
  } catch (error) {
    console.error("Error in calling OpenAI Chat API:", error);
    throw error; // Propagate the error for further handling
  }
}

module.exports = getGptResponse;
