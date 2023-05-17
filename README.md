# ReWrite
ReWrite is a website aimed at simplifying and summarizing text contents from a PDF document. The tool can be applied on complex scientific research papers, unorthodox formatted documents, or just about any PDF documents to genereate a simplified summary of the inputted file's text. On the website, we provide a simplified layout, giving the user the ability to easily navigate while trying the tool. The tools utilized are OpenAI's API alongside prompt engineering in roder to effectively and accurately provide a proper summary of the inputted file. 

# Progress:
Currently, the usecases that are operational are:
- User can upload PDF file
- Back end will scrape PDF document
- Website will display the simplified text of the uploaded PDF document that is produced by OpenAI

# Setup
To build the project, one needs to go in both the front and back end directories and build each project then start both servers up

1. Download the latest version of npm
2. Visit the directories of the front and back end and run "npm install" which will build the necessary dependencies
- Front-End: go to /src/ui/ then perform "npm install" (Angular should be version 15.2.0 or 15.2.6)
- Back-End: go to /src/backend/ then perform "npm install"
3. Open up two terminals, one for each server (front and back end)
- One terminal will handle the front-end, go to /src/ui/ then run "ng serve --open"
- Other terminai will handle the back-end, go to /src/back-end/ then run "node server.js"
4. The website should appear as localhost:4200/ where functionality is now enabled
5. Sample pdfs for testing can be found in src/back-end/docs/samplePDFs

## Contribution
For developers that wish to contribute or obtain the code:

1. Fork the ReWrite project
2. Create an independent feature branch ('git branch :branch-name:')
3. Commit feature changes with commit message ('git commit -m :summary of commit:')
4. Push changes on to the independent feature branch ('git push origin :branch-name:')
5. Create a pull request that will be reviewed and eventually merged to main branch

## Repo Layout
Inside of our src file you will find the directories for each of the projects major components. 

[ui](https://github.com/aldenhinden/ReWrite/tree/main/src/ui) contains all of the front-end website code.

[webscraping](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/webscrape) contains all of the coding and testing files for the exeution of the main webscraping protocol for gathering data from the user inputted files.

[prompt](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/prompt) contains all of the relevant information for prompt engineering the ChatGPT API in order to accurately gain the correct information from the input file. This folder contains sample prompts as well as various testing suites. 

[reports](https://github.com/aldenhinden/ReWrite/tree/main/reports) contains weekly status reports and updates on project progress.
