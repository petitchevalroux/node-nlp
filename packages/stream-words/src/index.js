"use strict";
const TransformStream = require("stream").Transform,
    XRegExp = require("xregexp"),
    regSeparator = new XRegExp("[^\\p{L}\\p{N}]", "g"),
    regMultipleSpaces = new RegExp(" {2,}", "g"),
    split2 = require("split2"),
    multipipe = require("multipipe");


module.exports = multipipe(new TransformStream({
    transform: (chunk, encoding, callback) => {
        this.firstChunk = typeof (this.firstChunk) === "undefined";
        this.previousEndWithSeparator = this.previousEndWithSeparator || false;
        const string = chunk.toString().replace(regSeparator, " ").replace(regMultipleSpaces, " "),
            result = (!this.firstChunk && (this.previousEndWithSeparator || string.charAt(0) === " ") ? " " : "") + string.trim();
        this.previousEndWithSeparator = string.slice(-1) === " ";
        callback(null, result);
    }
}), split2(" "));