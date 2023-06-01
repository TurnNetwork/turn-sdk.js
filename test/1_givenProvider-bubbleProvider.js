var chai = require('chai');
var assert = chai.assert;
global.ethereumProvider = 'http://givenProvider:8500';

describe('Web3.providers.givenProvider', function () {
    describe('should be set if bubble Provider is available ', function () {
        it('when instantiating Web3', function () {
            var Web3 = require('../packages/web3/src');
            assert.deepEqual(Web3.givenProvider, global.ethereumProvider);
        });

        it('when instantiating Bubble', function () {
            var bub = require('../packages/web3-eth/src');
            assert.deepEqual(bub.givenProvider, global.ethereumProvider);
        });
    });
});

