"use strict";
const removeAccents = require("remove-accents-diacritics");

module.exports = function stringRemoveAccents(string) {
    return removeAccents.remove(string.toString());
};