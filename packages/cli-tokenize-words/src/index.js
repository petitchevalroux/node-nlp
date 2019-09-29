"use strict";
const transform = require("@petitchevalroux/stream-words"),
    TransformStream = require("stream").Transform;

module.exports = (stdin, argv, stdout) => {
    stdin.pipe(transform).pipe(new TransformStream({
        transform: (chunk, encoding, callback) => {
            this.firstChunk = typeof(this.firstChunk) === 'undefined';
            callback(null, this.firstChunk ? chunk : `\n${chunk.toString()}`);
        }
    })).pipe(stdout);
};