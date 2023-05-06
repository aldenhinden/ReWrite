const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const fileUpload = require("express-fileupload");

// create the express app
const app = express();

// define the routing
app.get('/pdf/:filename', function(req, res) {

    // read the file into memory from routing
    const file_buffer = fs.readFileSync(req.params.filename);
    // test locally by adding           ^ 'samplePDFs/' + before req.params... since my sample is in a folder

    // parse the PDF and extract the text content
    pdfParse(file_buffer).then(function (pdf_data) {

        // send the text back to the client
        res.send(pdf_data.text);
    });
});

// start the server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});