"use strict";
const removeAccents = require("@petitchevalroux/string-remove-accents"),
    lowerCase = require("@petitchevalroux/string-lower-case"),
    removeNonAlphaNum = require("@petitchevalroux/string-remove-non-alpha-num");

module.exports = function tokenizerDefault(string) {
    return removeAccents(removeNonAlphaNum(lowerCase(string))).split(" ");
};