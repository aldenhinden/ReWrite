// Webscrape Imports
const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const fileUpload = require("express-fileupload");
const PDFDocument = require('pdfkit');
const doc = new PDFDocument;


// OpenAI Imports
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


// Back-end Server Start up

// initialize the express app
const app = express();
var cors = require('cors');
app.use(cors());

let API_KEY = "";

// WEB-SCRAPE: define the routing to perform scrape on input file
app.post('/upload/', fileUpload( {createParentPath: true}), (req, res) => {
    if (req.files == null) {
        API_KEY = "";
        return res.json({ status: "error", text: "" });
    }

    // check if uploaded file is a pdf
    if (req.files.doc.mimetype !== 'application/pdf') {
        return res.json({ status: "error", text: "Uploaded file is not a PDF." });
    }

    // saves uploaded file into memory into docs
    console.log(req.files.doc);
    fs.writeFileSync('./docs/uploaded/'+req.files.doc.name, req.files.doc.data);

    // read the file into memory from routing
    // const file_buffer = fs.readFileSync('docs/uploaded/'+req.files.doc.name);

    // parse the PDF and extract the text content
    pdfParse(req.files.doc.data).then(function (pdf_data) {
        // sends success message and txt to client if successful, else error
        if (pdf_data != null) {
            API_KEY = req.body.key;
            console.log(pdf_data);
            simplify(req.files.doc.name, pdf_data.text).then((result) => {
                return res.json({ status: "uploaded", text: result });
            });
            return;
        } else {
            this.API_KEY = "";
            return res.json({ status: "error", text: "" });
        }
    });
});

app.get('/simplified/', function(req, res) {
    console.log("FILENAME BACKEND: " + req.query.filename);
    return res.download("./docs/simplified/simplified_"+req.query.filename);
})

// SERVER: start the back end server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});


// OPENAI INTEGRATION: performs api call to OpenAI using pdf_txt
async function runCompletion (pdf_txt) {
    const configuration = new Configuration({
        // Use given API key
        apiKey: API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: pdf_txt,
      max_tokens: 2049,
    });
    let output = completion.data.choices[0].text;

    return output;
};

//TEXT TO PDF:
function export_as_pdf(doc_name, simplified_txt) {
    console.log("NAME : " + doc_name);
    console.log("SIMPLE TXT: " +simplified_txt)
    b = Buffer.from(simplified_txt, 'utf8');
    fs.writeFileSync('./docs/simplified/simplified_'+doc_name, b);
};


//PROMPTING: input complicated text, output simplified text
async function simplify(doc_name, input_text) {
    let context_length = 2000
    let text_compression = 1 // value of 0.5 means 500 words input -> 250 words output
    let memory_size = Math.floor(context_length / 10) // size of each mem block (old and new)

    let prompt_size = 100 // count words in prompt, 100 is just placeholder
    let input_size = Math.floor((context_length - memory_size * 2) * (1 / (1 + text_compression)))
    let max_output_size = context_length - (memory_size * 2 + prompt_size + input_size)

    //Break input_text into chunks of size input_size, loop over them to call gpt on each
    let memory = ""
    let simplified = ""
    while (input_text !== "") {
        //get next chunk of text, remove it from input_text
        let current_text = input_text.toString().substring(0, input_size)
        input_text = input_text.toString().substring(Math.min(input_text.length, input_size))

        //prepend the prompt and memory to the text chunk and send to gpt
        let full_prompt = dress_input(current_text, memory, max_output_size, memory_size)
        console.log("RUNNING API CALL");
        let gpt_output = await runCompletion(full_prompt)

        //parse output to update running simplified output and updated memory
        let [new_memory, new_simplified] = extract_parts(gpt_output)
        memory = truncate_extra_words(new_memory, memory_size)
        simplified += " " + new_simplified
        console.log(new_simplified + "\n\n")
    }

    export_as_pdf(doc_name, simplified);

    return simplified
}

function dress_input(input, memory, max_output_size, memory_size) {
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

function truncate_extra_words(str, max_words) {
    let words = str.split(" ")
    let i = 0
    let result = ""
    while (i < max_words && i < words.length) {
        result += words[i] + " "
        i += 1
    }
    return result
}

function extract_parts(gpt_output) {
    let mem_idx = gpt_output.search("Memory_New:")
    let out_idx = gpt_output.search("Output:")
    if (mem_idx == -1 || out_idx == -1) {
        return ["", ""] // if GPT didn't format the output properly.
    }

    let memory = gpt_output.substring(mem_idx + 12, out_idx)
    let output = gpt_output.substring(out_idx + 8)
    return [memory, output]
}