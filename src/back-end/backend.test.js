const { expect } = require('chai');
const server = require('./server.js');
const scrape = require('./services/scrape.js');
const translate = require('./services/translate.js');

describe('server', () => {
    it('should return correct text from a simple hardcoded sample PDF', () => {
        // Your test code goes here
        const path = require("path");
        const pdfPath = path.join(__dirname, "samplePDFs", "chocolate_chip_cookies.pdf");
    });
});

//act like gpt for formatting, but instead of simplifying just call toUpperCase
function gpt_simulator(prompt) {
    let input_idx = prompt.search("Input:")
    let input_string = prompt.substring(input_idx + 7)
    let out_str = "Memory_New: oldmem12345 Output: " + input_string.toUpperCase()
    return out_str
}

async function simplify_test_1 () {
   let input_str = "simplify this please"
   let result = await translate.simplify_testable("test_doc_out.pdf", input_str, gpt_simulator)
   expect(result).to.equal(" " + input_str.toUpperCase())
}

async function simplify_test_2 () {
    let input_str_1 = "simplify this please"
    let imput_str_2 = ""
    let i = 0
    while (i < 1000) {
        i += 1
        input_str_2 += input_str_1
    }

    let result = await translate.simplify_testable("test_doc_out.pdf", input_str_2, gpt_simulator)
    expect(result).to.equal(" " + input_str.toUpperCase())
}

describe('prompting', () => {
    describe('extract_parts()', () => {
        it('extract_parts() should should properly separate memory and output', () => {
            const test_string = "Memory_New: mem123 Output: output4567"
            const [result_mem, result_out] = translate.extract_parts(test_string)
            expect(result_mem).to.equal("mem123 ")
            expect(result_out).to.equal("output4567")
        }),
        it('extract_parts() should return error string if gpt output is bad', () => {
                const test_string = "test string without memory and output markers"
                const [result_mem, result_out] = translate.extract_parts(test_string)
                expect(result_mem).to.equal("")
                expect(result_out).to.equal("GPT_OUT_ERROR")
        })
    }),

    describe('truncate_extra_words()', () => {
        it('truncate_extra_words() should not modify strings shorter than max_words', () => {
            const test_string = "hello test"
            const result = translate.truncate_extra_words(test_string, 500)
            expect(result).to.equal(test_string)
        }),
        it('truncate_extra_words() should truncate correct amount of words', () => {
            const test_string = "hello test word word word final"
            const result = translate.truncate_extra_words(test_string, 5)
            expect(result).to.equal("hello test word word word")
        })
    }),

    describe('simplify()', () => {
        it('simplify() should work on strings smaller than a chunk', simplify_test_1 ),
        it('simplify() should work on strings larger than a chunk', simplify_test_1 )
    })
});

