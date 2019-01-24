const streamToXy = require(".."),
    assert = require("assert"),
    {
        PassThrough
    } = require("stream");

describe("streamToXy", () => {
    it("Transform a training stream to an XY array", () => {
        const stream = new PassThrough({
            objectMode: true
        });
        stream.write(['this is my first document', 'first']);
        stream.write(['this is my second document', 'second']);
        stream.end();
        return streamToXy(stream).then(([X, Y]) => {
            // Documents
            assert.deepEqual(X, ['this is my first document', 'this is my second document']);
            // Classes
            assert.deepEqual(Y, ['first', 'second']);
        });
    });
});