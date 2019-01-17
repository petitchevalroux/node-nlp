"use strict";
const path = require("path"),
    assert = require("assert"),
    tokenize = require(path.join(__dirname, ".."));
describe("tokenizer-default", () => {
    it("tokenize", () => {
        assert.deepEqual(tokenize("-this is a new word cafetière 42!"), [ 'this', 'is', 'a', 'new', 'word', 'cafetiere', '42' ]);
    });
});