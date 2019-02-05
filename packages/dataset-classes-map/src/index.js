"use strict";

class ClassesMap {


    /**
     * Constructor
     * @param {Iterator} classes classes as string
     */
    constructor(classes) {
        this.map = new Map();
        this.classes = Array.from(classes ? classes : []);
        for (const className of this.classes) {
            this.add(className);
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
            if (index === undefined) {
                throw Object
                    .assign(
                        new Error(`${className} does not exist`), {
                            code: ClassesMap.ERROR_NOT_EXISTS
                        }
                    );
            }
            throw Object
                .assign(
                    new Error(`${index} is not an integer for ${className}`), {
                        code: ClassesMap.ERROR_NOT_INTEGER
                    }
                );
        }
        return index;
    }

    /**
     * Add className to map and return its integer value
     * @param {String} className
     * @returns {Integer} 
     */
    add(className) {
        try {
            const index = this.get(className);
            return index;
        } catch (error) {
            if (error.code === ClassesMap.ERROR_NOT_EXISTS) {
                const size = this.map.size;
                this.map.set(className, size);
                return size;
            } else {
                throw error;
            }
        }
    }
}

Object.defineProperty(ClassesMap, 'ERROR_NOT_INTEGER', {
    value: 1,
    writable: false,
    enumerable: true,
    configurable: false
});

Object.defineProperty(ClassesMap, 'ERROR_NOT_EXISTS', {
    value: 2,
    writable: false,
    enumerable: true,
    configurable: false
});

module.exports = ClassesMap;