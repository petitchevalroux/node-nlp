"use strict";
const VectorBowFrequency = require("@petitchevalroux/vector-bow-frequency");


class VectorBowOneHot extends VectorBowFrequency {

    /**
     * Return One hot vector
     * @param {Array} bow Bag of words
     * @param {Corpus} corpus 
     */
    getVector(bow, corpus) {
        return super.getVector(bow, corpus).then(vector => {
            return vector.map(value => value ? 1 : 0);
        });
    }

}

module.exports = VectorBowOneHot;