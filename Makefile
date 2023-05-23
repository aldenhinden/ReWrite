install:
	cd ./src/back-end/ && npm install
	cd ./src/ui/ && npm install

run:
	cd ./src/back-end/ && npm run start &
	cd ./src/ui/ && npm run start-ui