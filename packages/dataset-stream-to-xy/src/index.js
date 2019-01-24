"use strict";
const Promise = require("bluebird"),
    toArray = require("stream-to-array");

/**
 * Transform a training set stream to an X,Y array
 * @param {Stream} readableStream
 * @returns {Promise<Array[Array,Array]>}
 */
function streamToXy(readableStream) {
    return new Promise((resolve, reject) => {
        toArray(readableStream, (error, data) => {
            if (error) {
                return reject(error);
            }
            const results = [
                [],
                []
            ];
            data.forEach(row => {
                [0, 1].forEach(index => {
                    results[index].push(row[index]);
                });
            });
            resolve(results);
        });
    })
};
module.exports = streamToXy;