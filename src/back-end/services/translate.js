const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()

module.exports = { run_completion, simplify, simplify_testable, extract_parts, truncate_extra_words, dress_input, };

async function run_completion(key, file_text) {
    try {
        const configuration = new Configuration({
          // Use given API key
          apiKey: key,
        });
        console.log("WORKING");
        const openai = new OpenAIApi(configuration);
    
        const completion = await openai.createCompletion({
          model: "text-davinci-003",
          prompt: file_text,
          max_tokens: 2049,
        });
    
        let output = completion.data.choices[0].text;
    
        return output;
    } catch (error) {
        // Handle the error
        return "##ERROR##: " + error;
    }
}

async function simplify(file_name, file_text, key) {
    return simplify_testable(file_name, file_text, key, run_completion);
}

async function simplify_testable(file_name, file_text, key, gpt_function) {
    let context_length = 2000
    let text_compression = 1 // value of 0.5 means 500 words input -> 250 words output
    let memory_size = Math.floor(context_length / 10) // size of each mem block (old and new)

    let prompt_size = 100 // count words in prompt, 100 is just placeholder
    let input_size = Math.floor((context_length - memory_size * 2) * (1 / (1 + text_compression)))
    let max_output_size = context_length - (memory_size * 2 + prompt_size + input_size)

    //Break file_text into chunks of size input_size, loop over them to call gpt on each
    let memory = ""
    let simplified = ""
    while (file_text !== "") {
        //get next chunk of text, remove it from file_text
        let current_text = file_text.toString().substring(0, input_size)
        file_text = file_text.toString().substring(Math.min(file_text.length, input_size))

        //prepend the prompt and memory to the text chunk and send to gpt
        let full_prompt = dress_input(current_text, memory, max_output_size, memory_size)
        console.log("RUNNING API CALL");
        let gpt_output = await gpt_function(key, full_prompt)
        if (gpt_output.startsWith("##ERROR##:")) {
            console.log("ERROR WITH PROGRAM");
            return gpt_output;
        }

        //parse output to update running simplified output and updated memory
        let [new_memory, new_simplified] = extract_parts(gpt_output)
        memory = truncate_extra_words(new_memory, memory_size)
        simplified += " " + new_simplified
        console.log(new_simplified + "\n\n")
    }
    console.log("FINISHED SIMPLIFYING");

    // export_as_pdf(file_name, simplified);

    return simplified
}

function extract_parts(gpt_output) {
    let mem_idx = gpt_output.search("Memory_New:")
    let out_idx = gpt_output.search("Output:")
    if (mem_idx == -1 || out_idx == -1) {
        return ["", "GPT_OUT_ERROR"] // if GPT didn't format the output properly.
    }

    let memory = gpt_output.substring(mem_idx + 12, out_idx)
    let output = gpt_output.substring(out_idx + 8)
    return [memory, output]
}

function truncate_extra_words(str, max_words) {
    let words = str.split(" ")
    let i = 0
    let result = ""
    while (i < max_words && i < words.length) {
        result += words[i] + " "
        i += 1
    }
    return result.substring(0, result.length - 1)
}

function dress_input (input, memory, max_output_size, memory_size) {
    let full_prompt = "" +
    "Following this are two portions of text, Input and Memory_Old. Input is a portion of text that needs to be " +
    "simplified, while Memory_Old is a storage for information from prior text that may be needed." +
    " First, write a section starting with \"Memory_New:\", where information from Input that may be relevant " +
    "to future text will be merged with Memory_Old to create a  summary of the work so far." +
    "Do not use more than " + memory_size.toString() + " words for this summary." +
    "Next, write a section starting with \"Output:\" that is a simplification and summarization of the input " +
    "text so that it can be understood easily by a layman, keeping use of jargon to a minimum." +
    "This simplification must not exceed " + max_output_size.toString() + "words.\n\n"

    full_prompt += ("Memory_Old:\n" + memory + "\n\n" + "Input:\n" + input)
    return full_prompt
}