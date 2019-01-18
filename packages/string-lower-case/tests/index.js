"use strict";
const path = require("path"),
    assert = require("assert"),
    lowerCase = require(path.join(__dirname, ".."));
describe("string-lower-case", () => {

    it("convert string to lower case", () => {
        assert.equal(lowerCase(
            "FoofLa"), "foofla");
    });

});