const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);
input_prompt = "What animal is stronger, Tiger or Lion?"
async function runCompletion () {
const completion = await openai.createCompletion({
  model: "text-davinci-003",
  prompt: input_prompt,
  max_tokens: 2049,
});
console.log(completion.data.choices[0].text);
}
runCompletion();