const ClassesMap = require(".."),
    assert = require("assert"),
    {
        PassThrough
    } = require("stream");

describe("ClassesMap", () => {

    const map = new ClassesMap(["class1", "class2", "class3", "class1"])
    describe("get", () => {
        it("throw an error if class do not exists", () => {
            assert.throws(() => {
                map.get("foo");
            });
        });
    });

    describe("toIntegers", () => {
        it("return converted classes to integers", () => {
            assert.deepEqual(map.toIntegers(), [0, 1, 2, 0]);
        });
    });

    describe("constructor", () => {
        it("works without params", () => {
            assert.deepEqual((new ClassesMap()).toIntegers(), []);
        });
    });

    describe("add", () => {
        it("return class integer if exists", () => {
            assert.equal(map.add("class3"), 2);
        });
        it("return a new integer if class does not exist", () => {
            assert.equal(map.add("class4"), 3);
        });
    });

    describe("getClass", () => {
        it("return class from integer if exists", () => {
            assert.equal(map.getClass(2), "class3");
        });
    });

    describe("toJSON", () => {
        it("return json", () => {
            assert.equal(map.toJSON(), "{\"classesToIntegers\":[[\"class1\",0],[\"class2\",1],[\"class3\",2],[\"class4\",3]],\"integersToClasses\":[[0,\"class1\"],[1,\"class2\"],[2,\"class3\"],[3,\"class4\"]],\"classes\":[\"class1\",\"class2\",\"class3\",\"class1\"]}");
        });
    });

    describe("fromJSON", () => {
        it("load from json string", () => {
            const newMap = new ClassesMap();
            newMap.fromJSON("{\"classesToIntegers\":[[\"class1\",0],[\"class2\",1],[\"class3\",2],[\"class4\",3]],\"integersToClasses\":[[0,\"class1\"],[1,\"class2\"],[2,\"class3\"],[3,\"class4\"]],\"classes\":[\"class1\",\"class2\",\"class3\",\"class1\"]}");
            assert.deepEqual(newMap.toIntegers(), [0, 1, 2, 0]);
            assert.equal(newMap.getClass(2), "class3");
            assert.equal(newMap.get("class2"), 1);
        });
    });
});