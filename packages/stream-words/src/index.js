"use strict";
const TransformStream = require("stream").Transform,
    XRegExp = require("xregexp"),
    regSeparator = new XRegExp("[^\\p{L}\\p{N}]", "g"),
    regMultipleSpaces = new RegExp(" {2,}", "g"),
    split2 = require("split2"),
    multipipe = require("multipipe");


module.exports = multipipe(new TransformStream({
    transform: (chunk, encoding, callback) => {
        callback(null, chunk.toString().replace(regSeparator, " ").replace(regMultipleSpaces, " ").trim() + " ");
    }
}), split2(" "));