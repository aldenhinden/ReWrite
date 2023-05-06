# Status Report
Week 6 status report

## Team Report
### Front-End
Progress: Began working on translation page where the upload PDF button and translate button have been implemented

Long-Term Goal: Finish Translation webpage then improve the styling of it

Responsibiltiy: John Li

### Back-End:
Progress: Basic webscraping working (Alden). Aquired understanding of how to inegrate ChatGPT with server, database schema coming along, rough draft not finished yet though.

Long-Term Goal: Connect webscraping both to front-end server and 'back-end' GPT calls (Alden). Complete ChatGPT integration and complete rough draft of schema to review with team members.

Responsibility: Alden, Yusuf

## Contributions
1. John Li
    - Progress Update: Resolved a navigation bar bug where the HTML elements of other components were being hidden behind it. Began working on the Translation page by implementing two buttons that allow users to upload a PDF document and translate the document. Currently struggling with the styling of elements and having difficulties in the format of the webpage for Home and Translation but will go ahead and implement a very simple UI.

    - Last Week's Goals:
        - Implement barebone skeleton of the Home and Translation page (ETA: 7 days) ✔️
        - Begin researching on how to save cookies (ETA: 1-2 days)
        - Improve styling on the webpages (ETA: N/A)


    - This Week's Goals:
        - Begin researching on how to save cookies (ETA: 1-2 days)
        - Improve styling on the webpages (ETA: N/A)
        - Implement barebone skeleton of the Home page (ETA: 3 days)


2. Alden Hinden
    - Progress Update: Completed a working implementation of a simple PDF webscraping program that takes a hardcoded PDF, scrapes it for its text, and simply prints to console for now. Also added a Mocha testing suite to verify that this works as intended. Currently working on trying to get the Express.js server up and running so input can be captured from the font-end instead of having to hardcode the PDF files. Need to understand where and how to send the data to ChatGPT once it has been integrated with the front-end. 

    - Last Week's Goals:
        - Get a working implementation of a simple PDF webscrape ✔️

    - This Week's Goals
        - Create an Express.js server and link to webscraper to allow users to upload the PDF instead of working with a hardcoded copy
        - Figure out where and how to send the scraped text


3. Yusuf Farah
    - Progress Update: Made good progress on ChatGPT integration research and will start coding this week. Database schema design taking a bit more time to get done, will try to have rough draft done by next week.

    - Last Week's Goals:
        - Finish integration of ChatGPT API with Node.js server
        - Create rough draft of database schema

    - This Week's Goals
        - Finish integration of ChatGPT API with Node.js server
        - Create rough draft of database schema



4. Ben Ihrig
    - Progress Update: Assembled test suite of academic papers to be summarized, gave them brief reads to see if I can get some understanding of if the GPT simplifications/summarizations is working properly. 

    - Last Week's Goals:
        - Assemble testing suite ✔️

    - This Week's Goals
        - Work with GPT integration code to get working code that pings GPT with a good prompt and returns the desired output. Help out with other sections of the project if neccessary.