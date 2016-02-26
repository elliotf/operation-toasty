install:
	npm install

clean:
	rm -rf node_modules

test:
	./node_modules/.bin/mocha --recursive -R spec

testwatch:
	./node_modules/.bin/nodemon --exec 'make test'

.PHONY: clean install test testwatch
