.build/build: Makefile
	mkdir -p .build && touch $@

$(ROOT_PATH)/.build/build:
	mkdir -p $(ROOT_PATH)/.build/ && touch $@