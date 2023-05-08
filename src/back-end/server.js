// Webscrape Imports
const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const fileUpload = require("express-fileupload");

// OpenAI Imports
const { Configuration, OpenAIApi } = require("openai");
require('dotenv').config()


// Back-end Server Start up

// initialize the express app
const app = express();
var cors = require('cors');
app.use(cors());

const API_KEY = "";

// WEB-SCRAPE: define the routing to perform scrape on input file
app.post('/upload/', fileUpload( {createParentPath: true}), (req, res) => {
    if (req.files == null) {
        API_KEY = "";
        return res.json({ status: "error", text: "" });
    }

    // saves uploaded file into memory into docs
    console.log(req.files.doc);
    fs.writeFileSync('docs/'+req.files.doc.name, req.files.doc.data);

    // read the file into memory from routing
    const file_buffer = fs.readFileSync('docs/'+req.files.doc.name);

    // parse the PDF and extract the text content
    pdfParse(file_buffer).then(function (pdf_data) {
        // sends success message and txt to client if successful, else error
        if (pdf_data != null) {
            this.API_KEY = req.body.key;
            res.json({ status: "uploaded", text: pdf_data.text });
            runCompletion(pdf_data.text);
            return;
        } else {
            this.API_KEY = "";
            return res.json({ status: "error", text: "" });
        }
    });
});

// SERVER: start the back end server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});


// OPENAI INTEGRATION: performs api call to OpenAI using pdf_txt
async function runCompletion (pdf_txt) {
    const configuration = new Configuration({
        // Use given API key
        apiKey: this.API_KEY,
    });
    const openai = new OpenAIApi(configuration);

    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: pdf_txt,
      max_tokens: 2049,
    });
    console.log(completion.data.choices[0].text);
};