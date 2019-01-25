"use strict";

class ClassesMap {
    /**
     * Constructor
     * @param {Iterator} classes classes as string
     */
    constructor(classes) {
        this.map = new Map();
        this.classes = classes;
        for (const className of classes) {
            if (!this.has(className)) {
                this.map.set(className, this.map.size);
            }
        }
    }

    /**
     * Return integers version of classes
     * @returns <Array>
     */
    toIntegers() {
        const self = this;
        return this
            .classes
            .map(name => self.get(name));
    }

    /**
     * true if className exists
     * @param {String} className 
     * @returns {Boolean}
     */
    has(className) {
        return this.map.has(className);
    }

    /**
     * return integer version of className
     * @param {String} className
     * @returns {Integer}
     */
    get(className) {
        const index = this.map.get(className);
        if (!Number.isInteger(index)) {
            throw new Error(`${index} is not an integer for ${className}`);
        }
        return index;
    }
}

module.exports = ClassesMap;