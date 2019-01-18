.PHONY: install
install: .build/install

.PHONY: tests
tests: .build/tests

.PHONY: clean
clean:
	rm -rf .build node_modules

.build/build: Makefile
	mkdir -p .build && touch $@

.build/install: .build/build package.json
	npm install && touch $@

.build/tests: .build/build
	touch $@
