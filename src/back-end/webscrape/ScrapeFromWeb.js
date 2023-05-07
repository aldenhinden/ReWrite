const fs = require("fs");
const pdfParse = require("pdf-parse");
const express = require("express");
const fileUpload = require("express-fileupload");

// create the express app
const app = express();

var cors = require('cors');
app.use(cors());

// define the routing
app.post('/upload/', fileUpload( {createParentPath: true}), (req, res) => {
    if (req.files == null) {
        return res.json({ status: "error", text: "" });
    }

    // saves uploaded file into memory into samplePDFs
    fs.writeFileSync('samplePDFs/'+req.files.file.name, req.files.file.data);

    // read the file into memory from routing
    const file_buffer = fs.readFileSync('samplePDFs/'+req.files.file.name);

    // parse the PDF and extract the text content
    pdfParse(file_buffer).then(function (pdf_data) {
        // sends success message and txt to client if successful, else error
        if (pdf_data != null) {
            return res.json({ status: "uploaded", text: pdf_data.text });

        } else {
            return res.json({ status: "error", text: "" });
        }
    });
});

// start the server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});