const { expect } = require('chai');
const { scrapePdf } = require('./server.js');

describe('scrapePdf', () => {
    it('should return correct text from a simple hardcoded sample PDF', () => {
        // Your test code goes here
        const path = require("path");
        const pdfPath = path.join(__dirname, "samplePDFs", "chocolate_chip_cookies.pdf");
    });
});