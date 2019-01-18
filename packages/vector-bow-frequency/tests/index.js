"use strict"
const path = require("path"),
    VectorBowFrequency = require(path.join("..")),
    Corpus = require("@petitchevalroux/corpus"),
    assert = require("assert"),
    bows = [
        ["souvent", "pour", "s’amuser", "les", "hommes", "d", "équipage"],
        ["prennent", "des", "albatros", "vastes", "oiseaux", "des", "mers"],
        ["qui", "suivent", "indolents", "compagnons", "de", "voyage"],
        ["le", "navire", "glissant", "sur", "grouffres", "amers"],
        ["a", "peine", "les", "ont", "ils", "déposés", "sur", "les", "planches"],
        ["que", "ces", "rois", "de", "l", "azur", "maladroits", "et", "honteux"],
        ["laissent", "piteusement", "leurs", "grandes", "ailes", "blanches"],
        ["comme", "des", "avirons", "traîner", "à", "côté", "d", "eux"]
    ];

describe("VectorBowFrequency", () => {

    function getCorpus() {
        const corpus = new Corpus();
        return corpus.addBows(bows).then(() => corpus);
    };

    const vector = new VectorBowFrequency();

    describe("getVector", () => {
        it("return frequency vector", () => {
            return getCorpus()
                .then(corpus => vector.getVector(["le", "navire", "sur", "glissant", "le", "sur", "grouffres", "amers", "le"], corpus))
                .then(vector => {
                    assert.deepEqual([0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        3,
                        0,
                        1,
                        1,
                        2,
                        1,
                        1,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0,
                        0
                    ], vector);
                })
        });
    });

    describe("getWordsMap", () => {
        it("return frequency vector", () => {
            return getCorpus()
                .then(corpus => vector.getWordsMap(["le", "navire", "sur", "glissant", "le", "sur", "grouffres", "amers", "le"], corpus))
                .then(wordsMap => {
                    assert.deepEqual(
                        Array.from(wordsMap),
                        [
                            ['souvent', 0],
                            ['pour', 0],
                            ['vastes', 0],
                            ['oiseaux', 0],
                            ['mers', 0],
                            ['qui', 0],
                            ['suivent', 0],
                            ['indolents', 0],
                            ['compagnons', 0],
                            ['de', 0],
                            ['voyage', 0],
                            ['le', 3],
                            ['s’amuser', 0],
                            ['navire', 1],
                            ['glissant', 1],
                            ['sur', 2],
                            ['grouffres', 1],
                            ['amers', 1],
                            ['a', 0],
                            ['peine', 0],
                            ['ont', 0],
                            ['ils', 0],
                            ['déposés', 0],
                            ['les', 0],
                            ['planches', 0],
                            ['que', 0],
                            ['ces', 0],
                            ['rois', 0],
                            ['l', 0],
                            ['azur', 0],
                            ['maladroits', 0],
                            ['et', 0],
                            ['honteux', 0],
                            ['laissent', 0],
                            ['hommes', 0],
                            ['piteusement', 0],
                            ['leurs', 0],
                            ['grandes', 0],
                            ['ailes', 0],
                            ['blanches', 0],
                            ['comme', 0],
                            ['avirons', 0],
                            ['traîner', 0],
                            ['à', 0],
                            ['côté', 0],
                            ['d', 0],
                            ['eux', 0],
                            ['équipage', 0],
                            ['prennent', 0],
                            ['des', 0],
                            ['albatros', 0]
                        ]);
                })
        });
    });
});