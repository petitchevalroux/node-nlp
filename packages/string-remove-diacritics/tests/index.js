"use strict";
const path = require("path"),
    assert = require("assert"),
    removeDiacritics = require(path.join(__dirname, ".."));
describe("string-remove-diacritics", () => {
    it("remove diacritics", () => {
        assert
            .equal(
                removeDiacritics("Iлｔèｒｎåｔïｏｎɑｌíƶａｔï߀ԉ"),
                "Internationalizati0n"
            );
    });
});