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

// WEB-SCRAPE: define the routing to perform scrape on input file
app.post('/upload/', fileUpload( {createParentPath: true}), async (req, res) => {
    if (req.files == null) {
        API_KEY = "";
        return res.json({ status: "error", text: "No file provided" });
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
    let pdf_data =  await scrape.parsePDF(req.files.doc.data);
    if (pdf_data != null) {
        this.API_KEY = req.body.key;

        // Sends file text to OpenAI's API to summarize
        let result = await translate.simplify(req.files.doc.name, pdf_data.text, this.API_KEY);
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
