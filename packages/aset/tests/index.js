"use strict";
const path = require("path"),
    Aset = require(path.join(__dirname, "..")),
    assert = require("assert"),
    {
        Writable,
        PassThrough
    } = require("stream");
describe("Aset", () => {
    const getInstance = () => {
        return new Aset();
    };

    describe("constructor", () => {
        it("export an instantiable class", () => {
            assert(getInstance() instanceof Aset);
        });
    })

    describe("add", () => {
        it("add an element", () => {
            getInstance().add(1).then(aset => aset.size()).then(size => assert.equal(size, 1));
        });
    });

    describe("getReadableStream", () => {
        it('return a readable stream emitting added elements in order', (done) => {
            const instance = getInstance();
            Promise
                .all([instance.add(1), instance.add(2), instance.add(3)])
                .then(() => {
                    const elements = [],
                        outStream = new Writable({
                            objectMode: true,
                            write: (chunk, encoding, callback) => {
                                elements.push(chunk);
                                callback();
                            }
                        });
                    instance.getReadableStream().pipe(outStream).on("finish", () => {
                        assert.deepEqual(elements, [1, 2, 3]);
                        done();
                    });
                });
        });
    });

    describe("getWritableStream", () => {
        it('return a writable stream where we can write elements', (done) => {
            const instance = getInstance(),
                input = new PassThrough({
                    objectMode: true
                });
            input.pipe(instance.getWritableStream()).on("finish", () => {
                instance.size()
                    .then(size => {
                        assert.equal(size, 3);
                        done();
                    });
            });
            input.push(1);
            input.push(2);
            input.push(3);
            input.push(null);
        });
    });

    describe("has", () => {
        it("return true if set contains the element", () => {
            const instance = getInstance()
            return Promise.all([instance.add(1), instance.add(2)]).then(() => instance.has(2)).then(result => {
                assert(result);
            });
        });
        it("return false if set does not contain the element", () => {
            const instance = getInstance()
            return Promise.all([instance.add(1), instance.add(2)]).then(() => instance.has(3)).then(result => {
                assert.equal(result, false);
            });
        });
    });


    describe("diff", () => {
        it("compute diff", () => {
            const instance = getInstance(),
                toSubtract = getInstance();
            return Promise.all([
                    instance.add(1),
                    instance.add(2),
                    instance.add(3),
                    toSubtract.add(4),
                    toSubtract.add(2),
                ])
                .then(() => instance.diff(toSubtract))
                .then(resultingSet => resultingSet.size())
                .then(size => assert.equal(size, 2));
        });
    });

    describe("union", () => {
        it("compute union between Aset", () => {
            const instance = getInstance(),
                toAdd = getInstance();
            return Promise.all([
                    instance.add(1),
                    instance.add(2),
                    instance.add(3),
                    toAdd.add(4),
                    toAdd.add(2),
                ])
                .then(() => instance.union(toAdd))
                .then(resultingSet => resultingSet.size())
                .then(size => assert.equal(size, 4));
        });

        it("compute union with iterable", () => {
            const instance = getInstance();
            return instance.union([1, 2, 3, 4])
                .then(result => result.size())
                .then(size => assert.equal(size, 4));
        });
    });
});