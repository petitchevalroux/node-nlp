"use strict";
const path = require("path"),
    assert = require("assert"),
    removeAlphaNum = require(path.join(__dirname, ".."));
describe("string-remove-non-alpha-num", () => {
    it("keep only alpha num", () => {
        assert
            .equal(
                removeAlphaNum("   this is 901--- 53"),
                "this is 901 53"
            );
    });
});