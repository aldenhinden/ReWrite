# ReWrite
ReWrite is a project developed in CSE 403: Software Engineering at the University of Washington. 

## Overview
The goal of this website is to make things like complex scientific research papers more easily understandable for the average person. We provide an intuitive UI, giving the user the ability to input a URL to a research paper, for example. We then use the ChatGPT API alongside some prompt engineering in order to procure an organized summary of the input paper. 

## Repo Layout
Inside of our src file you will find the directories for each of the projects major components. 

[ui](https://github.com/aldenhinden/ReWrite/tree/main/src/ui) contains all of the front-end website code.

[webscraping](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/webscrape) contains all of the coding and testing files for the exeution of the main webscraping protocol for gathering data from the user inputted files.

[prompt](https://github.com/aldenhinden/ReWrite/tree/main/src/back-end/prompt) contains all of the relevant information for prompt engineering the ChatGPT API in order to accurately gain the correct information from the input file. This folder contains sample prompts as well as various testing suites. 

[reports](https://github.com/aldenhinden/ReWrite/tree/main/reports) contains weekly status reports and updates on project progress.
