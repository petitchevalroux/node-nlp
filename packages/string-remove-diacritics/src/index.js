"use strict";
const removeDiacritics = require("diacritics").remove;

module.exports = function stringRemoveDiacritics(string) {
    return removeDiacritics(string.toString());
};