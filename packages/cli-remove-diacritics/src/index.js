"use strict";
const transform = require("@petitchevalroux/stream-remove-diacritics");

module.exports = (stdin, argv, stdout) => {
    stdin.pipe(transform).pipe(stdout);
};