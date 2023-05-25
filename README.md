# ReWrite
ReWrite is a website aimed at simplifying and summarizing text contents from a PDF document. The tool can be applied on complex scientific research papers, unorthodox formatted documents, or just about any PDF documents to genereate a simplified summary of the inputted file's text. On the website, we provide a simplified layout, giving the user the ability to easily navigate while trying the tool. The tools utilized are OpenAI's API alongside prompt engineering in roder to effectively and accurately provide a proper summary of the inputted file. 

# Progress:
Currently, the usecases that are operational are:
- User can upload PDF file
- Back end will scrape PDF document
- Website will display the simplified text of the uploaded PDF document that is produced by OpenAI

# User Information

## Setup
To build the project, one needs to go in both the front and back end directories and build each project then start both servers up

1. Download the latest version of npm and [make](https://www.gnu.org/software/make/manual/make.html). 
2. From the home directory, run `make install` which will build the necessary dependencies. The Angular version used should be version 15.2.0 or 15.2.6.
3. Run `make run`, which will build and start the front-end website and launch the back-end server.
  - The website should appear as localhost:4200/ where functionality is now enabled, and the back-end server should be listening from port 3000. 
  - Alternatively, if `make` is not installed, this can be achieved via opening two terminals and running the following commands:
    - One terminal will handle the front-end, go to /src/ui/ then run "ng serve --open"
    - Other terminal will handle the back-end, go to /src/back-end/ then run "node server.js"
6. Sample pdfs for testing can be found in src/back-end/docs/samplePDFs

## Using the Product
1. Proceed to Translation page
2. Generate an OpenAI API key from https://platform.openai.com/account/api-keys
3. Copy the key and input it into the API key box
4. Upload a PDF document
5. Hit the Translation button
6. View the summary of the inputted document in the box below

## Known Bugs
- With some PDF documents, the prompt given and returned to OpenAI's API may be longer than the allowed character limit causing the backend to throw an error as the character limit has been exceeded
- With long PDF documents, a longer wait is to be expected as well as multiple API calls to OpenAI's API but may return still a lengthy summary. The simplification simplifies a document but the summary may still be long depending on the length of the inputted document

## Report Bugs
If one discovers a bug that have not been discovered, please raise an issue on the Github Issue's page where the developers will review

# Developer Contribution
For developers that wish to contribute or obtain the code:

1. Fork the ReWrite project
2. Create an independent feature branch (`git branch 'branch-name'`)
3. Commit feature changes with commit message (`git commit -m 'summary of commit'`)
4. Push changes on to the independent feature branch (`git push origin 'branch-name'`)
5. Create a pull request that will be reviewed and eventually merged to main branch

## Testing:

### Front-End
Angular contains its testing code in the components `spec.ts` files. Currently, all components contains the default test of checking if the page renders along with the correct title. To create tests for specific components, navigate to `'component-name'.component.spec.ts` then add a new test at the bottom for the front-end. All the tests for all components will be ran using the `front.ci.yml` CI workflow by Github Actions on each push to the main branch.

### Back-End
In order to test the back-end code, navigate to `src/back-end/backend.test.js`. This file contains Mocha tests run using the Chai testing framework for the `server.js` file which contains the code for the back-end. You can run test suites by running the individual `describe()` functions, or by running their `it()` functions directly within the suite. To add tests for `server.js`, you can follow the infrastructure of the Chai `describe/it` functions to add new testing suites and specific tests within each suite; simply add your tests below the existing ones. All tests in this file will be run for the back-end using the Node.js CI workflow by Github Actions in `.github/workflows/backend.js.yml` on each push. 

## Repo Layout
Inside of our src file you will find the directories for each of the projects major components. 

[ui](https://github.com/aldenhinden/ReWrite/tree/main/src/ui) contains all of the front-end website code.

[webscraping](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/webscrape) contains all of the coding and testing files for the exeution of the main webscraping protocol for gathering data from the user inputted files.

[prompt](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/prompt) contains all of the relevant information for prompt engineering the ChatGPT API in order to accurately gain the correct information from the input file. This folder contains sample prompts as well as various testing suites. 

[reports](https://github.com/aldenhinden/ReWrite/tree/main/reports) contains weekly status reports and updates on project progress.
