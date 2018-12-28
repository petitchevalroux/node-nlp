"use strict";
const {
    Writable,
    Readable
} = require("stream");

class Corpus {
    constructor() {
        this.wordsToIds = new Map();
        this.wordFrequencies = new Map();
    }

    /**
     * Add bow bag of words to corpus
     * @param {Array} bow bag of words
     * @returns {Promise<Corpus>}
     */
    addBow(bow) {
        const self = this;
        return new Promise((resolve, reject) => {
            const readable = new Readable({
                objectMode: true
            });
            readable
                .pipe(self.getWritableWordStream())
                .on("error", (error) => {
                    reject(error);
                })
                .on("finish", () => {
                    resolve(self);
                });
            for (const word of bow) {
                readable.push(word);
            }
            readable.push(null);
        });
    }

    /**
     * Add all bag of words in bows
     * @param {Array<Array>} bows array of bag of words to add to corpus
     * @returns {Promise<Corpus>}
     */
    addBows(bows) {
        const self = this;
        return new Promise((resolve, reject) => {
            const readable = new Readable({
                objectMode: true
            });
            readable
                .pipe(self.getWritableBowStream())
                .on("error", (error) => {
                    reject(error);
                })
                .on("finish", () => {
                    resolve(self);
                });
            for (const bow of bows) {
                readable.push(bow);
            }
            readable.push(null);
        });
    }

    /**
     * Add word to corpus
     * @param {String} word word to add to corpus
     * @returns {Promise<Mixed>} word id/hash
     */
    addWord(word) {
        const self = this;
        return (new Promise(resolve => {
            const wordId = self.wordsToIds.get(word);
            if (wordId !== undefined) {
                self.wordFrequencies.set(wordId, self.wordFrequencies.get(wordId) + 1);
                return resolve(wordId);
            }
            const size = self.wordsToIds.size;
            self.wordsToIds.set(word, size);
            self.wordFrequencies.set(size, 1);
            resolve(size);
        }));
    }

    /**
     * Return true if word is in corpus
     * @param {String} word word to check
     * @param {Boolean}
     */
    hasWord(word) {
        return this.getWordFrequency(word).then(frequency => {
            return frequency ? true : false;
        });
    }

    /**
     * Return word frequency in corpus
     * @param {String} word word to get frequency from
     * @requires {Promise<Number>}
     */
    getWordFrequency(word) {
        const self = this;
        return (new Promise(resolve => {
            const wordId = self.wordsToIds.get(word);
            if (wordId === undefined) {
                return resolve(0);
            }
            const frequency = self.wordFrequencies.get(wordId);
            resolve(frequency ? parseInt(frequency) : 0);
        }));
    }
    /**
     * Return a writable stream calling func for each chunk
     * @param {callable} func
     * @returns {WritableStream}
     */
    getWritableStream(func) {
        const self = this;
        return new Writable({
            objectMode: true,
            write: (chunk, encoding, callback) => {
                try {
                    func(chunk).then(() => {
                        callback();
                    }).catch(error => {
                        callback(error);
                    });
                } catch (error) {
                    callback(error);
                }
            }
        });
    }

    /**
     * Return a writable stream to add bow to corpus
     * @returns {WritableStream}
     */
    getWritableBowStream() {
        const self = this;
        return this.getWritableStream((bow) => {
            return self.addBow(bow);
        });
    }

    /**
     * Return a writable stream to add word to corpus
     * @returns {WritableStream}
     */
    getWritableWordStream() {
        const self = this;
        return this.getWritableStream((word) => {
            return self.addWord(word);
        });
    }

    /**
     * Return corpus words count
     * @returns {Promise<Number>}
     */
    getWordsCount() {
        const self = this;
        return new Promise(resolve => {
            resolve(self.wordsToIds.size);
        });
    }

    /**
     * Return ids from bow
     * @param {Array} bow bag of words
     * @returns {Promise<{Array<String>}>} ids
     */
    getWordsIds(bow) {
        const self = this;
        return new Promise(resolve => {
            resolve(bow.map(word => {
                const wordId = self.wordsToIds.get(word);
                return wordId === undefined ? "" : wordId.toString();
            }));
        });
    }

    /**
     * Return all word ids from corpus
     * returns {Promise<Iterator>}
     */
    getAllWordsIds() {
        const self = this;
        return new Promise(resolve => {
            resolve(Array.from(self.wordsToIds.values()).map(element => element.toString()));
        });
    }

    /**
     * Return word frequency in corpus
     * @param {String} word word to get frequency from
     * @requires {Promise<Number>}
     */
    getBowFrequencies(bow) {
        return Promise.all(bow.map(word => this.getWordFrequency(word)));
    }

    /**
     * Return words wisth wordsId
     * @param Array wordIds word ids
     * @returns {Promise<Array>}
     */
    getWordsByIds(wordIds) {
        const self = this;
        return new Promise((resolve) => {
            const idToWords = new Map(Array.from(self.wordsToIds).map(element => [element[1].toString(), element[0]]));
            resolve(wordIds.map(wordId => {
                const word = idToWords.get(wordId);
                return word ? word : ""
            }));
        });
    }
}

module.exports = Corpus;