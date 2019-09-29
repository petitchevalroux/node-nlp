"use strict";
const transform = require("@petitchevalroux/stream-lower-case");

module.exports = (stdin, argv, stdout) => {
    stdin.pipe(transform).pipe(stdout);
};