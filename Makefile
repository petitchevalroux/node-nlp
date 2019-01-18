LERNA=./node_modules/.bin/lerna
LERNA_UPDATE=./node_modules/.bin/lernaupdate

.PHONY: tests
tests: $(LERNA)
	lerna exec make tests

.PHONY: clean
clean: $(LERNA)
	lerna exec make clean && rm -rf .build

.PHONY: update-wizard
update-wizard: $(LERNA_UPDATE)
	$(LERNA_UPDATE)

$(LERNA): .build/install

$(LERNA_UPDATE): .build/install

.build/build: Makefile
	mkdir -p .build && touch $@

.build/install: .build/build package.json
	npm install && touch $@