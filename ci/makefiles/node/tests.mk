.PHONY: tests
tests: .build/tests

MOCHA=$(ROOT_PATH)/node_modules/.bin/_mocha

$(MOCHA): $(ROOT_PATH)/.build/install

.build/tests: .build/build .build/install $(MOCHA) $(TEST_FILES) $(SOURCE_FILES)
	test "$(TEST_FILES)" = "" || $(MOCHA) $(TEST_FILES)
	touch $@