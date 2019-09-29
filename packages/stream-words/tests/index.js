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
            assert.deepEqual(result,[ 'Lorem',
            'ipsum',
            '02192',
            'sit',
            'amet',
            'foo',
            'bar',
            'Etiam',
            'facilisis' ]);
            done();
        });
        inputStream.push("Lorem ipsum 02192 sit amet\nfoo \rbar.")
        inputStream.push(",Etiam facilisis");
        inputStream.push(null);
    });

});