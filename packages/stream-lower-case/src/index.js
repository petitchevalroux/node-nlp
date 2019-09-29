"use strict";
const TransformStream = require("stream").Transform,
    transform = require("@petitchevalroux/string-lower-case");

module.exports = new TransformStream({
    transform: (chunk, encoding, callback) => {
        try {
            callback(null, transform(chunk.toString()));
        } catch (error) {
            callback(error);
        }
    }
});