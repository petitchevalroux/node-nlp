"use strict";

class ClassesMap {


    /**
     * Constructor
     * @param {Iterator} classes classes as string
     */
    constructor(classes) {
        this.classesToIntegers = new Map();
        this.integersToClasses = new Map();
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
        return this.classesToIntegers.has(className);
    }

    /**
     * return integer version of className
     * @param {String} className
     * @returns {Integer}
     */
    get(className) {
        const index = this.classesToIntegers.get(className);
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
                const size = this.classesToIntegers.size;
                this.integersToClasses.set(size, className);
                this.classesToIntegers.set(className, size);
                return size;
            } else {
                throw error;
            }
        }
    }

    /**
     * Return class from integer
     * @param {Integer} integer
     * @returns {String}
     */
    getClass(integer) {
        const label = this.integersToClasses.get(integer);
        if (label === undefined) {
            throw Object
                .assign(
                    new Error(`${className} does not exist`), {
                        code: ClassesMap.ERROR_NOT_EXISTS
                    }
                );
        }
        return label;
    }

    /**
     * Return json string
     * @returns String
     */
    toJSON() {
        return JSON.stringify({
            classesToIntegers: Array.from(this.classesToIntegers.entries()),
            integersToClasses: Array.from(this.integersToClasses.entries()),
            classes: this.classes
        });
    }

    /**
     * Load from json string
     * @param {String} json
     */
    fromJSON(json) {
        const data = JSON.parse(json);
        this.classesToIntegers = new Map(data.classesToIntegers);
        this.integersToClasses = new Map(data.integersToClasses);
        this.classes = data.classes;
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