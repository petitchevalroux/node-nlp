"use strict";
const path = require("path"),
    assert = require("assert"),
    removeAccents = require(path.join(__dirname, ".."));
describe("string-remove-accents", () => {
    it("remove accent", () => {
        assert.equal(removeAccents(
            "cafetière"), "cafetiere");
    });
});