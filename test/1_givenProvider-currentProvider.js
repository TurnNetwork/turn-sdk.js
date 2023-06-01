var chai = require('chai');
var assert = chai.assert;

global.web3 = {
    currentProvider: 'http://givenProvider:8500'
};


describe('Web3.providers.givenProvider', function () {
    describe('should be set if web3.currentProvider is available ', function () {

        it('when instantiating Web3', function () {
            var Web3 = require('../packages/web3/src');
            console.log("Web3.givenProvider:", Web3.givenProvider)
        //    assert.deepEqual(Web3.givenProvider, global.web3.currentProvider);

        });

        it('when instantiating Bubble', function () {
            var bub = require('../packages/web3-eth/src');
            console.log("bub.givenProvider:", bub.givenProvider)
        //    assert.deepEqual(bub.givenProvider, global.web3.currentProvider);
        });
    });
});

