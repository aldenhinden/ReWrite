install:
    cd ./src/back-end/ && npm install
    cd ./src/ui/ && npm install

run:
    cd ./src/back-end/ && node server.js
    cd ./src/ui/ && ng serve --open