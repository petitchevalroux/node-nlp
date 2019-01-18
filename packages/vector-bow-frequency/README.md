#vector-bow-frequency
Vectorize bag of words with words frequency

## Usage
```javascript
const Corpus = require("@petitchevalroux/corpus"),
    corpus = new Corpus(),
    VectorBowFrequency = require("@petitchevalroux/vector-bow-frequency");

corpus.addBow(["one", "two", "three"])
    .then(() => {
        const vectorBowFrequency = new VectorBowFrequency();
        return vectorBowFrequency.getVector(["one", "three", "one", "four"], corpus);
    })
    .then(vector => {
        console.log(vector); // [2,0,1]
    });
```
