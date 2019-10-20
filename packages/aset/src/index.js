"use strict";
const {
    Writable,
    Transform,
} = require("stream"),
    intoStream = require("into-stream");
class Aset {
    constructor() {
        this.set = new Set();
    }
    /**
     * Add an element
     * @param {*} element string to add
     * @returns {Promise<Aset>}
     */
    add(element) {
        const self = this;
        return new Promise(resolve => {
            this.set.add(element);
            resolve(self);
        });
    }

    /**
     * Return set size
     * @returns {Promise<Number>}
     */
    size() {
        return new Promise(resolve => resolve(this.set.size));
    }

    /**
     * Return true if set contains element
     * @param {*} element 
     * @returns {Promise<Boolean>}
     */
    has(element) {
        return new Promise(resolve => resolve(this.set.has(element)));
    }

    /**
     * Return a readable stream
     * @returns {ReadableStream}
     */
    getReadableStream() {
        return intoStream.obj(this.set.values());
    }

    /**
     * Return a writable stream
     * @returns {WritableStream}
     */
    getWritableStream() {
        const self = this;
        return new Writable({
            objectMode: true,
            write: (chunk, encoding, callback) => {
                self.add(chunk).then(callback()).catch(error => callback(error));
            }
        });
    }

    /**
     * Filter elements according to isValidCallback
     * @param {CallableFunction} isValidCallback  isValidCallback({*}element) return {Promise<Boolean>} true if element is valid
     * @returns {Promise<Aset>} Resulting Aset
     */
    filter(isValidCallback) {
        const self = this;
        return new Promise((resolve, reject) => {
            const outSet = new Aset(),
                outStream = outSet.getWritableStream();
            self.getReadableStream()
                .on("error", error => {
                    reject(error);
                })
                .pipe(new Transform({
                    objectMode: true,
                    transform: (element, encoding, callback) => {
                        isValidCallback(element)
                            .then(isValid => {
                                return callback(null, isValid ? element : undefined);
                            })
                            .catch(error => callback(error));
                    }
                }))
                .pipe(outStream)
                .on("finish", () => {
                    resolve(outSet);
                })
                .on("error", error => {
                    reject(error);
                });
        });
    }

    /**
     * Compute diff between current set and toSubstract
     * @param {Aset} toSubtract set to subtract from current set
     * @returns {Promise<Aset>} Resulting Aset
     */
    diff(toSubtract) {
        return this.filter(element => {
            return toSubtract.has(element).then(has => !has);
        });
    }


    addFromStream(readableStream) {
        const self = this;
        return new Promise((resolve, reject) => {
            readableStream
                .pipe(self.getWritableStream())
                .on('finish', () => resolve(self))
                .on('error', error => reject(error));
        })
    }
    /**
     * Add toAdd elements to current set
     * @param {Iterable\Aset} toAdd contain element to add 
     * @returns {Promise<Aset>}
     */
    union(toAdd) {
        const outSet = new Aset();
        return outSet
            .addFromStream(this.getReadableStream())
            .then(outSet => outSet.addFromStream(
                toAdd instanceof Aset ? toAdd.getReadableStream() : intoStream.obj(toAdd)
            ))
            .then(() => outSet);
    }
}

module.exports = Aset;