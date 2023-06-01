var chai = require("chai");
var assert = chai.assert;
var Bubble = require("../packages/web3-eth");
var Web3 = require("../packages/web3");

var bub = new Bubble();

var setValue = "0x47d33b27bb249a2dbab4c0612bf9caf4c1950855";

describe("web3.bub", function() {
    describe("defaultAccount", function() {
        it("should check if defaultAccount is set to proper value", function() {
            assert.equal(bub.defaultAccount, null);
            assert.equal(bub.personal.defaultAccount, null);
            assert.equal(bub.Contract.defaultAccount, null);
            assert.equal(bub.getCode.method.defaultAccount, null);
        });
        it("should set defaultAccount for all sub packages is set to proper value, if Bubble package is changed", function() {
            bub.defaultAccount = setValue;

            assert.equal(bub.defaultAccount, setValue.toLowerCase());
            assert.equal(bub.personal.defaultAccount, setValue);
            assert.equal(bub.Contract.defaultAccount, setValue.toLowerCase());
            assert.equal(bub.getCode.method.defaultAccount, setValue.toLowerCase());
        });
        it("should fail if address is invalid, wich is to be set to defaultAccount", function() {
            assert.throws(function() {
                bub.defaultAccount =
                    "0x17F33b27Bb249a2DBab4C0612BF9CaF4C1950855";
            });
        });
        it("should have different values for two Bubble instances", function() {
            var bub1 = new Bubble();
            bub1.defaultAccount = setValue;
            assert.equal(bub1.defaultAccount, setValue.toLowerCase());

            var bub2 = new Bubble();
            assert.equal(bub2.defaultAccount, null);
        });
        it("should have different values for two Web3 instances", function() {
            var web31 = new Web3();
            web31.bub.defaultAccount = setValue;
            assert.equal(web31.bub.defaultAccount, setValue.toLowerCase());

            var web32 = new Web3();
            assert.equal(web32.bub.defaultAccount, null);
        });
    });
});
