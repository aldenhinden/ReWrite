const { expect } = require('chai');
const { server } = require('./server.js');

describe('server', () => {
    it('should return correct text from a simple hardcoded sample PDF', () => {
        // Your test code goes here
        const path = require("path");
        const pdfPath = path.join(__dirname, "samplePDFs", "chocolate_chip_cookies.pdf");
    });
});