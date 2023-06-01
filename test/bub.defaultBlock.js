var chai = require("chai");
var assert = chai.assert;
var Bubble = require("../packages/web3-eth");

var bub = new Bubble();

var setValue = 123;

describe("web3.bub", function() {
    describe("defaultBlock", function() {
        it("should check if defaultBlock is set to proper value", function() {
            assert.equal(bub.defaultBlock, "latest");
            assert.equal(bub.personal.defaultBlock, "latest");
            assert.equal(bub.Contract.defaultBlock, "latest");
            assert.equal(bub.getCode.method.defaultBlock, "latest");
        });
        it("should set defaultBlock for all sub packages is set to proper value, if Eth package is changed", function() {
            bub.defaultBlock = setValue;

            assert.equal(bub.defaultBlock, setValue);
            assert.equal(bub.personal.defaultBlock, setValue);
            assert.equal(bub.Contract.defaultBlock, setValue);
            assert.equal(bub.getCode.method.defaultBlock, setValue);
        });
    });
});
