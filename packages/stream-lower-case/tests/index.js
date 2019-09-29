"use strict";
const path = require("path"),
    assert = require("assert"),
    transform = require(path.join(__dirname, "..")),
    WritableStream = require("stream").Writable,
    PassThroughStream = require("stream").PassThrough;


describe("stream-remove-diacritics", () => {
    it("remove diacritics", (done) => {
        const result = [],
            outputStream = new WritableStream({
                write: (chunk, encoding, callback) => {
                    result.push(chunk.toString());
                    callback();
                }
            }),
            inputStream = new PassThroughStream();
        inputStream.pipe(transform).pipe(outputStream);
        outputStream.on("finish", () => {
            assert.deepEqual(result.join(','),'thisisa,test')
            done();
        });
        inputStream.push("ThisIsA")
        inputStream.push("Test")
        inputStream.push(null);
    });

});