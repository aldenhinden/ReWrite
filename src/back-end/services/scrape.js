const pdfParse = require("pdf-parse");

module.exports = {
    // Scrapes text from a PDF file
    // Returns: String of PDF text
    parsePDF: async function(file) {
        let pdf_data = await pdfParse(file);
        return pdf_data;
    },

};