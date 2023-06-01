var chai = require('chai');
var assert = chai.assert;
var u = require('./helpers/test.utils.js');

var Bubble = require('../packages/web3-eth');
var bub = new Bubble();

describe('bub', function() {
    describe('methods', function() {
        u.methodExists(bub, 'getBalance');
        u.methodExists(bub, 'getStorageAt');
        u.methodExists(bub, 'getTransactionCount');
        u.methodExists(bub, 'getCode');
        u.methodExists(bub, 'isSyncing');
        u.methodExists(bub, 'sendTransaction');
        u.methodExists(bub, 'call');
        u.methodExists(bub, 'getBlock');
        u.methodExists(bub, 'getTransaction');
        u.methodExists(bub, 'getBlockTransactionCount');
        u.methodExists(bub, 'subscribe');
        u.methodExists(bub, 'Contract');
        u.methodExists(bub, 'getGasPrice');
        u.methodExists(bub, 'getAccounts');
        u.methodExists(bub, 'getBlockNumber');
        u.methodExists(bub, 'getProtocolVersion');
        u.methodExists(bub, 'setProvider');
        u.propertyExists(bub, 'givenProvider');
        u.propertyExists(bub, 'defaultBlock');
        u.propertyExists(bub, 'defaultAccount');

        u.propertyExists(bub, 'net');
        u.methodExists(bub.net, 'getId');
        u.methodExists(bub.net, 'isListening');
        u.methodExists(bub.net, 'getPeerCount');

        u.propertyExists(bub, 'personal');
        u.methodExists(bub.personal, 'sendTransaction');
        u.methodExists(bub.personal, 'newAccount');
        u.methodExists(bub.personal, 'unlockAccount');
    });
});

