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
    console.log(req);
    fs.writeFileSync('samplePDFs/test.pdf', req.files.file.data);

    // read the file into memory from routing
    const file_buffer = fs.readFileSync('samplePDFs/test.pdf');
    // test locally by adding           ^ 'samplePDFs/'+  here before req.params... since my sample is in a folder
    // then navigate to localhost:3000/pdf/chocolate_chip_cookies.pdf <- should print text from that pdf

    // parse the PDF and extract the text content

    pdfParse(file_buffer).then(function (pdf_data) {
        // send the text back to the client
        console.log(pdf_data);
        res.send(pdf_data.text);
    });
});

// start the server
app.listen(3500, function() {
    console.log('Server is listening on port 3500');
});