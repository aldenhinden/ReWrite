const fs = require("fs");
const pdfParse = require("pdf-parse");

// construct absolute path to the PDF file <- FILE IS HARDCODED FOR NOW
const path = require("path");
const pdfPath = path.join(__dirname, "samplePDFs", "chocolate_chip_cookies.pdf");

// read the file into memory
const file_buffer = fs.readFileSync(pdfPath);

// parse the pdf into its data components
pdfParse(file_buffer).then((pdf_data) =>  {

    // extract text from pdf data
    const text = pdf_data.text;

    // FOR NOW: print text to console
    console.log(text);
});