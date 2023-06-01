var chai = require("chai");
var assert = chai.assert;
var u = require("./helpers/test.utils.js");
var Bubble = require("../packages/web3-eth");
var bub = new Bubble();

describe("web3.net", function() {
    describe("methods", function() {
        u.methodExists(bub.net, "getId");
        u.methodExists(bub.net, "getNetworkType");
        u.methodExists(bub.net, "isListening");
        u.methodExists(bub.net, "getPeerCount");
    });
});
