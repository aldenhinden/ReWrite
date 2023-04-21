const express = require("express");
const fileUpload = require("express-fileupload");
const pdfParse = require("pdf-parse");
const fs = require("fs");

const app = express();

// Define the route for PDF text extraction
app.get('/pdf/:filename', function(req, res) {
    // Load the PDF file
    const dataBuffer = fs.readFileSync(req.params.filename);

    // Define the options for the PDF parsing
    const options = {
        pagerender: function (pageData) {
            return pageData.getTextContent().then(function (textContent) {
                let finalString = '';
                textContent.items.forEach(function (item) {
                    finalString += item.str + ' ';
                });
                return finalString;
            });
        }
    };

    // Parse the PDF and extract the text content
    pdfParse(dataBuffer, options).then(function (data) {
        // Set the content type header
        res.setHeader('Content-Type', 'text/plain');
        // Set the response body
        res.send(data.text);
    });
});

// Start the server
app.listen(3000, function() {
    console.log('Server is listening on port 3000');
});