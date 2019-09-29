"use strict";
const path = require("path"),
    assert = require("assert"),
    transform = require(path.join(__dirname, "..")),
    WritableStream = require("stream").Writable,
    PassThroughStream = require("stream").PassThrough;


describe("stream-words", () => {
    it("stream words", (done) => {
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
            assert.deepEqual(
                result,
                [
                    'Lorem',
                    '02192',
                    'amet',
                    'foo',
                    'bar',
                    'Etiam',
                    'facilisis',
                    'lola',
                    'li',
                    'fo'
                ]
            );
            done();
        });
        inputStream.push(".Lorem 02192 amet\nfoo \rbar.") // Remove initial 
        // Split between chunks when previous chunk end with separator and actual chunk begin with separator 
        inputStream.push(",Etiam facilisis lo");
        // Concat between chunk 
        inputStream.push("la.");
        // Split between chunk when previous chunk end with separator
        inputStream.push("li");
        // Split between chunks when actual chunk begin with separator
        // No split when last chunk end with separator
        inputStream.push(".fo?");
        inputStream.push(null);
    });

});