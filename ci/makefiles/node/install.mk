.PHONY: install
install: .build/install

.build/install: $(ROOT_PATH)/.build/install .build/build package.json
	npm install
	touch $@

$(ROOT_PATH)/.build/install: $(ROOT_PATH)/.build/build $(ROOT_PATH)/package.json
	cd $(ROOT_PATH)/ && npm install && touch .build/install
