const path = require("path"),
    Promise = require("bluebird"),
    Corpus = require(".."),
    assert = require("assert"),
    {
        PassThrough
    } = require("stream");

describe("Corpus", () => {
    describe("addWord", () => {
        it("return different ids with different words", () => {
            const corpus = new Corpus();
            return Promise
                .all([
                    corpus.addWord("foo"),
                    corpus.addWord("bar")
                ])
                .then(results => {
                    assert(results[0] !== results[1]);
                });
        });

        it("return same ids with same words", () => {
            const corpus = new Corpus();
            return Promise
                .all([
                    corpus.addWord("foo"),
                    corpus.addWord("foo")
                ])
                .then(results => {
                    assert(results[0] === results[1]);
                });
        });
    });

    describe("getWritableWordStream", () => {
        it("add all writen words", (done) => {
            const corpus = new Corpus(),
                wordStream = new PassThrough({
                    objectMode: true
                });
            wordStream
                .pipe(corpus.getWritableWordStream())
                .on("finish", () => {
                    Promise.all([
                            corpus.hasWord("bar"),
                            corpus.hasWord("foo"),
                            corpus.hasWord("dum")
                        ])
                        .then(results => {
                            assert(results[0]);
                            assert(results[1]);
                            assert(results[2]);
                            done();
                        });
                });
            ["foo", "bar", "dum"].forEach((word) => {
                wordStream.write(word);
            });
            wordStream.end();
        });

    });


    describe("getWritableBowStream", () => {
        it("add all writen words", (done) => {
            const corpus = new Corpus(),
                wordStream = new PassThrough({
                    objectMode: true
                });
            wordStream
                .pipe(corpus.getWritableBowStream())
                .on("finish", () => {
                    Promise.all([
                            corpus.hasWord("bar"),
                            corpus.hasWord("foo"),
                            corpus.hasWord("da"),
                            corpus.hasWord("la"),
                            corpus.hasWord("li"),
                            corpus.hasWord("dum")
                        ])
                        .then(results => {
                            assert(results[0]);
                            assert(results[1]);
                            assert(results[2]);
                            assert(results[3]);
                            assert(results[4]);
                            assert(results[5]);
                            done();
                        });
                });
            [
                ["foo", "bar", "dum"],
                ["la", "li", "da"]
            ].forEach((bow) => {
                wordStream.write(bow);
            });
            wordStream.end();
        });
    });

    describe("addBows", () => {
        it("add all words and handle word frequency", () => {
            const corpus = new Corpus();
            return corpus.addBows([
                    ["foo", "bar", "dum"],
                    ["la", "li", "da"],
                    ["dum", "li", "dum"],
                ])
                .then(() => {
                    return Promise.all([
                        corpus.getWordFrequency("bar"),
                        corpus.getWordFrequency("foo"),
                        corpus.getWordFrequency("da"),
                        corpus.getWordFrequency("la"),
                        corpus.getWordFrequency("li"),
                        corpus.getWordFrequency("dum")
                    ]);
                })
                .then(results => {
                    assert.equal(results[0], 1);
                    assert.equal(results[1], 1);
                    assert.equal(results[2], 1);
                    assert.equal(results[3], 1);
                    assert.equal(results[4], 2);
                    assert.equal(results[5], 3);
                });
        });
    });


    describe("getWordsCount", () => {
        it("return words count", () => {
            const corpus = new Corpus();
            return corpus.addBows([
                    ["foo", "bar", "dum", "la", "li", "da"],
                    ["la", "li", "da", "dum", "li", "dum"]
                ])
                .then(corpus => {
                    return corpus.getWordsCount();
                })
                .then(count => {
                    assert.equal(count, 6);
                });
        });
    });


    describe("getWordsIds", () => {
        it("return words ids", () => {
            const corpus = new Corpus();
            return corpus.addBows([
                    ["foo", "bar", "dum", "la", "li", "da"]
                ])
                .then(corpus => {
                    return corpus.getWordsIds(["foo", "bar", "dum", "la", "unexist", "li", "da"]);
                })
                .then(wordsIds => {
                    assert.deepEqual(wordsIds, ['0', '1', '2', '3', "", '4', '5'])
                });
        });
    });

    describe("getAllWordsIds", () => {
        it("return words ids", () => {
            const corpus = new Corpus();
            return corpus.addBows([
                    ["foo", "bar", "dum", "la", "li", "da"]
                ])
                .then(corpus => {
                    return corpus.getAllWordsIds();
                })
                .then(wordsIds => {
                    assert.deepEqual(Array.from(wordsIds), ['0', '1', '2', '3', '4', '5'])
                });
        });
    });

    describe("getBowFrequencies", () => {
        it("return bow frequencies", () => {
            const corpus = new Corpus();
            return corpus.addBows([
                    ["foo", "bar", "bar", "lol", "foo", "da"]
                ])
                .then(corpus => {
                    return corpus.getBowFrequencies(["foo", "bar", "bar", "lol", "foo", "da"]);
                })
                .then(frequencies => {
                    assert.deepEqual(Array.from(frequencies), [2, 2, 2, 1, 2, 1]);
                });
        });
    });
});