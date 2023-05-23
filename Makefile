all: ui backend

install:
	cd ./src/back-end/ && npm install
	cd ./src/ui/ && npm install

ui:
	cd ./src/ui/ && ng serve --open

backend:
	cd ./src/back-end/ && node server.js