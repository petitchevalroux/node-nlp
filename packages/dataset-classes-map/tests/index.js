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
});