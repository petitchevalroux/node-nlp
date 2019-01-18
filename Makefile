LERNA=./node_modules/.bin/lerna

.PHONY: tests
tests: $(LERNA)
	lerna exec make tests

.PHONY: clean
clean: $(LERNA)
	lerna exec make clean && rm -rf .build

$(LERNA): .build/install

.build/build: Makefile
	mkdir -p .build && touch $@

.build/install: .build/build package.json
	npm install && touch $@