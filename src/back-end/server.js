// Webscrape Imports
const fs = require("fs");
const express = require("express");
const fileUpload = require("express-fileupload");

const scrape = require('./services/scrape');
const translate = require('./services/translate');

// Back-end Server Start up
const app = express();
var cors = require('cors');
app.use(cors());

let API_KEY = "";

// Receives information from the client side to summarize the given PDF file
app.post('/upload/', fileUpload( {createParentPath: true}), async (req, res) => {
    // Error handling of: no file, invalid PDF file, no translation type was selected
    if (req.files == null || req.files.doc.mimetype !== 'application/pdf' || req.body.type == "") {
        API_KEY = "";
        let error_text = "";
        if (req.files == null) {
            error_text = "No file provided";
        } else if (req.files.doc.mimetype !== 'application/pdf') {
            error_text = "Uploaded file is not a PDF.";
        } else if (req.body.type == "") {
            error_text = "Translation type was not selected.";
        }
        return res.json({ status: "error", text: error_text });
    }


    // saves uploaded file into memory into docs
    console.log(req.files.doc);
    fs.writeFileSync('./docs/uploaded/'+req.files.doc.name, req.files.doc.data);

    // read the file into memory from routing
    // const file_buffer = fs.readFileSync('docs/uploaded/'+req.files.doc.name);

    // parse the PDF and extract the text content
    let pdf_data =  await scrape.parsePDF(req.files.doc.data);
    if (pdf_data != null) {
        this.API_KEY = req.body.key;

        // Sends file text to OpenAI's API to summarize
        let result;
        if (req.body.type == "deep") {
            result = await translate.simplify(req.files.doc.name, pdf_data.text, this.API_KEY);
        } else if (req.body.type == "simple") {
            // result = <translate.quicksimplify...
            console.log("quick simplify");
            return;
        }

        if (result.startsWith("##ERROR##")) {
            return res.json({ status: "error", text: result });
        } else {
            return res.json({ status: "uploaded", text: result });
        }
    }
     else {
        this.API_KEY = "";
        return res.json({ status: "error", text: "No text found in PDF file" });
    }
});

app.get('/simplified/', function(req, res) {
    console.log("FILENAME BACKEND: " + req.query.filename);
    return res.download("./docs/simplified/simplified_"+req.query.filename);
})

// SERVER: start the back end server
// if this is being run in a testing environment, skip
if (!process.env.TEST_ENV) {
    app.listen(3000, function() {
        console.log('Server is listening on port 3000');
    });
}
