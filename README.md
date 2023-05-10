# ReWrite
ReWrite is a project developed in CSE 403: Software Engineering at the University of Washington. 

## Overview
The goal of this website is to make things like complex scientific research papers more easily understandable for the average person. We provide an intuitive UI, giving the user the ability to input a URL to a research paper, for example. We then use the ChatGPT API alongside some prompt engineering in order to procure an organized summary of the input paper. 

# Setup
To build the project, one needs to go in both the front and back end directories and build each project then start both servers up

1. Download the latest version of npm
2. Visit the directories of the front and back end and run "npm install" which will build the necessary dependencies
- Front-End: go to /src/ui/ then perform "npm install" (Angular should be version 15.2.0 or 15.2.6)
- Back-End: go to /src/backend/ then perform "node server.js"
3. Open up two terminals, one for each server (front and back end)
- One terminal will handle the front-end, go to /src/ui/ then run "ng serve --open"
- Other terminai will handle the back-end, go to /src/backend/ then run "node server.js"
4. The website should appear as localhost:4200/ where functionality is now enabled

## Repo Layout
Inside of our src file you will find the directories for each of the projects major components. 

[ui](https://github.com/aldenhinden/ReWrite/tree/main/src/ui) contains all of the front-end website code.

[webscraping](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/webscrape) contains all of the coding and testing files for the exeution of the main webscraping protocol for gathering data from the user inputted files.

[prompt](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/prompt) contains all of the relevant information for prompt engineering the ChatGPT API in order to accurately gain the correct information from the input file. This folder contains sample prompts as well as various testing suites. 

[reports](https://github.com/aldenhinden/ReWrite/tree/main/reports) contains weekly status reports and updates on project progress.
