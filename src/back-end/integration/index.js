const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  // Read and save API key stored in .env
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
// Prompt saved in variable input_prompt
input_prompt = "What animal is stronger, Tiger or Lion?"
async function runCompletion () {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: input_prompt,
  max_tokens: 2049,
});
// Print reply to console FOR NOW. Will send to front-end.
console.log(completion.data.choices[0].text);
}
runCompletion();