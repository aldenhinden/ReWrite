const { expect } = require('chai');
const server = require('./server.js');

describe('server', () => {
    it('should return correct text from a simple hardcoded sample PDF', () => {
        // Your test code goes here
        const path = require("path");
        const pdfPath = path.join(__dirname, "samplePDFs", "chocolate_chip_cookies.pdf");
    });
});

describe('prompting', () => {
    describe('extract_parts()', () => {
        it('extract_parts() should should properly separate memory and output', () => {
            const test_string = "Memory_New: mem123 Output: output4567"
            const [result_mem, result_out] = server.extract_parts(test_string)
            expect(result_mem).to.equal("mem123 ")
            expect(result_out).to.equal("output4567")
        }),
        it('extract_parts() should return error string if gpt output is bad', () => {
                const test_string = "test string without memory and output markers"
                const [result_mem, result_out] = server.extract_parts(test_string)
                expect(result_mem).to.equal("")
                expect(result_out).to.equal("GPT_OUT_ERROR")
        })
    }),

    describe('truncate_extra_words()', () => {
        it('truncate_extra_words() should not modify strings shorter than max_words', () => {
            const test_string = "hello test"
            const result = server.truncate_extra_words(test_string, 500)
            expect(result).to.equal(test_string)
        }),
        it('truncate_extra_words() should truncate correct amount of words', () => {
            const test_string = "hello test word word word final"
            const result = server.truncate_extra_words(test_string, 5)
            expect(result).to.equal("hello test word word word")
        })
    })

});

