"use strict";
const XRegExp = require("xregexp"),
    regNonAlphaNum = XRegExp("[^\\p{L}\\p{Nd}]", "g"),
    regMultipleSpaces = XRegExp(" {2,}", "g");

module.exports = function stringRemoveNonAlphaNum(string) {
    return string.toString()
        .replace(regNonAlphaNum, " ")
        .replace(regMultipleSpaces, " ")
        .trim();
};