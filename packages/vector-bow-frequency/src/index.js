"use strict";
const Corpus = require("@petitchevalroux/corpus");


class VectorBowFrequency {

    getSortedWordIds(corpus) {
        return corpus
            .getAllWordsIds()
            .then(wordIds => Array.from(wordIds).sort());
    }

    /**
     * Return frequency vector
     * @param {Array} bow Bag of words
     * @param {Corpus} corpus 
     */
    getVector(bow, corpus) {
        const bowCorpus = new Corpus(),
            self = this;
        return bowCorpus
            .addBow(bow)
            .then(() => bowCorpus.getBowFrequencies(bow))
            .then(frequencies => {
                return corpus.getWordsIds(bow).then(wordIds => [frequencies[Symbol.iterator](), wordIds]);
            })
            .then(([frequencies, wordIds]) => {
                const idsToFrequency = new Map();
                for (const wordId of wordIds) {
                    idsToFrequency.set(wordId, frequencies.next().value);
                }
                return idsToFrequency;
            })
            .then(idsToFrequency => {
                return self.getSortedWordIds(corpus).then(wordIds => [idsToFrequency, wordIds]);
            })
            .then(([idsToFrequency, wordIds]) => {
                const vector = [];
                for (const wordId of wordIds) {
                    const frequency = idsToFrequency.get(wordId);
                    vector.push(frequency ? parseInt(frequency) : 0);
                }
                return vector;
            });
    }

    /**
     * Return word=>frequency map
     * @param {Iterable} bow bag of words
     * @param {Corpus} corpus 
     */
    getWordsMap(bow, corpus) {
        return this.getVector(bow, corpus)
            .then(vector => this.getSortedWordIds(corpus).then(wordIds => [vector, wordIds]))
            .then(([vector, wordIds]) => corpus.getWordsByIds(wordIds).then(words => [vector[Symbol.iterator](), words]))
            .then(([vector, words]) => {
                const map = new Map();
                for (const word of words) {
                    map.set(word, vector.next().value);
                }
                return map;
            });
    }
}

module.exports = VectorBowFrequency;