
TEST_PATH="tests"
TEST_FILES=$(shell test -d $(TEST_PATH) && find $(TEST_PATH) -type f -name "*.js")
SOURCE_PATH="src"
SOURCE_FILES=$(shell test -d $(SOURCE_PATH) && find $(SOURCE_PATH) -type f -name "*.js")

include $(ROOT_PATH)/ci/makefiles/node/build.mk
include $(ROOT_PATH)/ci/makefiles/node/install.mk
include $(ROOT_PATH)/ci/makefiles/node/tests.mk
include $(ROOT_PATH)/ci/makefiles/node/clean.mk