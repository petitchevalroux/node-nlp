const Corpus = require("@petitchevalroux/corpus"),
    corpus = new Corpus(),
    VectorBowOneHot = require("@petitchevalroux/vector-bow-one-hot");

corpus.addBow(["one", "two", "three"])
    .then(() => {
        const vectorBowOneHot = new VectorBowOneHot();
        return vectorBowOneHot.getVector(["one", "three", "one", "four"], corpus);
    })
    .then(vector => {
        console.log(vector); // [1,0,1]
    });