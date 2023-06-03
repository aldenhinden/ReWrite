# Status Report
Week 7 status report

## Team Report
### Front-End
Progress: Implemented basic functionality and design of Translation page and created temporary descriptions of Home and Login page. Translation page contains Api Key Link, Translation button, File document upload, and text area that displays the simplified text received from the backend.

Long-Term Goal: Hoping to improve the translation page by including more features such as PDF download compatability and improving the Home and Login webpage.

Responsibiltiy: John Li

### Back-End:
Progress: Implemented functional full stack from input to simplified output.

Long-Term Goal: Optimize the prompting setup, develop new ways of storing/sending the user's request to them, develop comprehensive testing suite

Responsibility: Ben Ihrig, Alden Hinden, Yusuf Farah

## Contributions
1. John Li
    - Progress Update: Implemented textarea box for the simplified text from OpenAI to show up for the user. Connected front-end and back-end routing so that users can upload their own PDF documents and have it be saved and read in the back end. Implemented API key text box that is sent to the backend and stored for future tasks. After simplifying text from OpenAI, implemented responses to clients in the form of JSON files.

    - Last Week's Goals:
        - Improve styling on the webpages (ETA: N/A)
        - Implement barebone skeleton of the Home page (ETA: 3 days) ✔️


    - This Week's Goals:
        - Allow back end to send a PDF file to the client so that users can download the document in PDF format
        - Clean up the format of the structure of the code for back end and front end
        - Begin stylizing home and login screen
        - Implment proper ordering for saving PDF documents uploaded by the user in the back end


2. Alden Hinden
    - Progress Update: Complete working version of a server that takes a hardcoded PDF file and scrapes it for text. Also added error some error checking once we had functionality with PDF uploading on the front end. 

    - Last Week's Goals:
        - Create an Express.js server and link to webscraper to allow users to upload the PDF instead of working with a hardcoded copy ✔️

    - This Week's Goals: 
        - Potentially expand into more general webscraping. 
        - Assist with any other project expansion. 

3. Yusuf Farah
    - Progress Update: Completed integration of ChatGPT API with Node.js server so now we can communicate with the chatGPT API, sending
    requests and recieving responses. Was not able to work on databasing due to the ChatGPT integration taking longer than previously thought.

    - Last Week's Goals:
        - Finish integration of ChatGPT API with Node.js server ✔️
        - Create rough draft of database schema

    - This Week's Goals:
        - Finish integration of ChatGPT API with Node.js server ✔️
        - Create rough draft of database schema


4. Ben Ihrig
    - Progress Update: Designed + implemented a prompting setup for breaking down long texts into portions, with the ability to remember information from previous sections while analysing current ones.

    - Last Week's Goals: 
        - Implement prompting setup ✔️
        - Implement testing for prompt architecture X

    - This Week's Goals
        - Finish implementing testing for prompt architecture
        - Look into tweaking the prompting setup to achieve better speed / informational accuracy
        - Help out with other tasks where needed 
