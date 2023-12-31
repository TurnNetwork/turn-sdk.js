/*
 This file is part of web3.js.

 web3.js is free software: you can redistribute it and/or modify
 it under the terms of the GNU Lesser General Public License as published by
 the Free Software Foundation, either version 3 of the License, or
 (at your option) any later version.

 web3.js is distributed in the hope that it will be useful,
 but WITHOUT ANY WARRANTY; without even the implied warranty of
 MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 GNU Lesser General Public License for more details.

 You should have received a copy of the GNU Lesser General Public License
 along with web3.js.  If not, see <http://www.gnu.org/licenses/>.
 */
/**
 * @file index.js
 * @author Fabian Vogelsteller <fabian@ethereum.org>
 * @date 2017
 */

"use strict";

var _ = require('underscore');
var core = require('web3-core');
var helpers = require('web3-core-helpers');
var Subscriptions = require('web3-core-subscriptions').subscriptions;
var Method = require('web3-core-method');
var utils = require('web3-utils');
var Net = require('web3-net');

var ENS = require('web3-eth-ens');
var Personal = require('web3-eth-personal');
var BaseContract = require('web3-eth-contract');
var Accounts = require('web3-eth-accounts');
var abi = require('web3-eth-abi');

var getNetworkType = require('./getNetworkType.js');
var formatter = helpers.formatters;


var blockCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? "platon_getBlockByHash" : "platon_getBlockByNumber";
};

var transactionFromBlockCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'platon_getTransactionByBlockHashAndIndex' : 'platon_getTransactionByBlockNumberAndIndex';
};

var uncleCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'platon_getUncleByBlockHashAndIndex' : 'platon_getUncleByBlockNumberAndIndex';
};

var getBlockTransactionCountCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'platon_getBlockTransactionCountByHash' : 'platon_getBlockTransactionCountByNumber';
};

var uncleCountCall = function (args) {
    return (_.isString(args[0]) && args[0].indexOf('0x') === 0) ? 'platon_getUncleCountByBlockHash' : 'platon_getUncleCountByBlockNumber';
};


var Eth = function Eth() {
    var _this = this;

    // sets _requestmanager
    core.packageInit(this, arguments);

    // overwrite setProvider
    var setProvider = this.setProvider;
    this.setProvider = function () {
        setProvider.apply(_this, arguments);
        _this.net.setProvider.apply(_this, arguments);
        _this.personal.setProvider.apply(_this, arguments);
        _this.accounts.setProvider.apply(_this, arguments);
        _this.Contract.setProvider(_this.currentProvider, _this.accounts);
    };


    var handleRevert = false;
    var defaultAccount = null;
    var defaultBlock = 'latest';
    var transactionBlockTimeout = 50;
    var transactionConfirmationBlocks = 24;
    var transactionPollingTimeout = 750;
    var defaultChain, defaultHardfork, defaultCommon;

    Object.defineProperty(this, 'handleRevert', {
        get: function () {
            return handleRevert;
        },
        set: function (val) {
            handleRevert = val;

            // also set on the Contract object
            _this.Contract.handleRevert = handleRevert;

            // update handleRevert
            methods.forEach(function(method) {
                method.handleRevert = handleRevert;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultCommon', {
        get: function () {
            return defaultCommon;
        },
        set: function (val) {
            defaultCommon = val;

            // also set on the Contract object
            _this.Contract.defaultCommon = defaultCommon;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultCommon = defaultCommon;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultHardfork', {
        get: function () {
            return defaultHardfork;
        },
        set: function (val) {
            defaultHardfork = val;

            // also set on the Contract object
            _this.Contract.defaultHardfork = defaultHardfork;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultHardfork = defaultHardfork;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultChain', {
        get: function () {
            return defaultChain;
        },
        set: function (val) {
            defaultChain = val;

            // also set on the Contract object
            _this.Contract.defaultChain = defaultChain;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultChain = defaultChain;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionPollingTimeout', {
        get: function () {
            return transactionPollingTimeout;
        },
        set: function (val) {
            transactionPollingTimeout = val;

            // also set on the Contract object
            _this.Contract.transactionPollingTimeout = transactionPollingTimeout;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionPollingTimeout = transactionPollingTimeout;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionConfirmationBlocks', {
        get: function () {
            return transactionConfirmationBlocks;
        },
        set: function (val) {
            transactionConfirmationBlocks = val;

            // also set on the Contract object
            _this.Contract.transactionConfirmationBlocks = transactionConfirmationBlocks;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionConfirmationBlocks = transactionConfirmationBlocks;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'transactionBlockTimeout', {
        get: function () {
            return transactionBlockTimeout;
        },
        set: function (val) {
            transactionBlockTimeout = val;

            // also set on the Contract object
            _this.Contract.transactionBlockTimeout = transactionBlockTimeout;

            // update defaultBlock
            methods.forEach(function(method) {
                method.transactionBlockTimeout = transactionBlockTimeout;
            });
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultAccount', {
        get: function () {
            return defaultAccount;
        },
        set: function (val) {
            if(val) {
                //defaultAccount = utils.toChecksumAddress(formatter.inputAddressFormatter(val));
                defaultAccount = formatter.inputAddressFormatter(val);
            }

            // also set on the Contract object
            _this.Contract.defaultAccount = defaultAccount;
            _this.personal.defaultAccount = defaultAccount;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultAccount = defaultAccount;
            });

            return val;
        },
        enumerable: true
    });
    Object.defineProperty(this, 'defaultBlock', {
        get: function () {
            return defaultBlock;
        },
        set: function (val) {
            defaultBlock = val;
            // also set on the Contract object
            _this.Contract.defaultBlock = defaultBlock;
            _this.personal.defaultBlock = defaultBlock;

            // update defaultBlock
            methods.forEach(function(method) {
                method.defaultBlock = defaultBlock;
            });

            return val;
        },
        enumerable: true
    });


    this.clearSubscriptions = _this._requestManager.clearSubscriptions;

    // add net
    this.net = new Net(this.currentProvider);
    // add chain detection
    this.net.getNetworkType = getNetworkType.bind(this);

    // add accounts
    this.accounts = new Accounts(this.currentProvider);

    // add personal
    this.personal = new Personal(this.currentProvider);
    this.personal.defaultAccount = this.defaultAccount;

    // create a proxy Contract type for this instance, as a Contract's provider
    // is stored as a class member rather than an instance variable. If we do
    // not create this proxy type, changing the provider in one instance of
    // web3-eth would subsequently change the provider for _all_ contract
    // instances!
    var self = this;
    var Contract = function Contract() {
        BaseContract.apply(this, arguments);

        // when Eth.setProvider is called, call packageInit
        // on all contract instances instantiated via this Eth
        // instances. This will update the currentProvider for
        // the contract instances
        var _this = this;
        var setProvider = self.setProvider;
        self.setProvider = function() {
          setProvider.apply(self, arguments);
          core.packageInit(_this, [self.currentProvider]);
        };
    };

    Contract.setProvider = function() {
        BaseContract.setProvider.apply(this, arguments);
    };

    // make our proxy Contract inherit from web3-eth-contract so that it has all
    // the right functionality and so that instanceof and friends work properly
    Contract.prototype = Object.create(BaseContract.prototype);
    Contract.prototype.constructor = Contract;

    // add contract
    this.Contract = Contract;
    this.Contract.defaultAccount = this.defaultAccount;
    this.Contract.defaultBlock = this.defaultBlock;
    this.Contract.transactionBlockTimeout = this.transactionBlockTimeout;
    this.Contract.transactionConfirmationBlocks = this.transactionConfirmationBlocks;
    this.Contract.transactionPollingTimeout = this.transactionPollingTimeout;
    this.Contract.handleRevert = this.handleRevert;
    this.Contract.setProvider(this.currentProvider, this.accounts);

    // add ABI
    this.abi = abi;

    // add ENS
    this.ens = new ENS(this);

    var methods = [
        new Method({
            name: 'getNodeInfo',
            call: 'web3_clientVersion'
        }),
        new Method({
            name: 'getProtocolVersion',
            call: 'platon_protocolVersion',
            params: 0
        }),
        new Method({
            name: 'isSyncing',
            call: 'platon_syncing',
            params: 0,
            outputFormatter: formatter.outputSyncingFormatter
        }),
        new Method({
            name: 'getGasPrice',
            call: 'platon_gasPrice',
            params: 0,
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getAccounts',
            call: 'platon_accounts',
            params: 0
            //outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getAddressHrp',
            call: 'platon_getAddressHrp',
            params: 0
        }),
        new Method({
            name: 'getBlockNumber',
            call: 'platon_blockNumber',
            params: 0,
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getBalance',
            call: 'platon_getBalance',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: formatter.outputBigNumberFormatter
        }),
        new Method({
            name: 'getStorageAt',
            call: 'platon_getStorageAt',
            params: 3,
            inputFormatter: [formatter.inputAddressFormatter, utils.numberToHex, formatter.inputDefaultBlockNumberFormatter]
        }),
        new Method({
            name: 'getCode',
            call: 'platon_getCode',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter]
        }),
        new Method({
            name: 'getBlock',
            call: blockCall,
            params: 2,
            inputFormatter: [formatter.inputBlockNumberFormatter, function (val) { return !!val; }],
            outputFormatter: formatter.outputBlockFormatter
        }),
        new Method({
            name: 'getBlockTransactionCount',
            call: getBlockTransactionCountCall,
            params: 1,
            inputFormatter: [formatter.inputBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getTransaction',
            call: 'platon_getTransactionByHash',
            params: 1,
            inputFormatter: [null],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getTransactionFromBlock',
            call: transactionFromBlockCall,
            params: 2,
            inputFormatter: [formatter.inputBlockNumberFormatter, utils.numberToHex],
            outputFormatter: formatter.outputTransactionFormatter
        }),
        new Method({
            name: 'getTransactionReceipt',
            call: 'platon_getTransactionReceipt',
            params: 1,
            inputFormatter: [null],
            outputFormatter: formatter.outputTransactionReceiptFormatter
        }),
        new Method({
            name: 'getTransactionCount',
            call: 'platon_getTransactionCount',
            params: 2,
            inputFormatter: [formatter.inputAddressFormatter, formatter.inputDefaultBlockNumberFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'sendSignedTransaction',
            call: 'platon_sendRawTransaction',
            params: 1,
            inputFormatter: [null]
        }),
        new Method({
            name: 'signTransaction',
            call: 'platon_signTransaction',
            params: 1,
            inputFormatter: [formatter.inputTransactionFormatter]
        }),
        new Method({
            name: 'sendTransaction',
            call: 'platon_sendTransaction',
            params: 1,
            inputFormatter: [formatter.inputTransactionFormatter],
            abiCoder: abi
        }),
        new Method({
            name: 'sign',
            call: 'platon_sign',
            params: 2,
            inputFormatter: [formatter.inputSignFormatter, formatter.inputAddressFormatter],
            transformPayload: function (payload) {
                payload.params.reverse();
                return payload;
            }
        }),
        new Method({
            name: 'call',
            call: 'platon_call',
            params: 2,
            inputFormatter: [formatter.inputCallFormatter, formatter.inputDefaultBlockNumberFormatter],
            abiCoder: abi
        }),
        new Method({
            name: 'estimateGas',
            call: 'platon_estimateGas',
            params: 1,
            inputFormatter: [formatter.inputCallFormatter],
            outputFormatter: utils.hexToNumber
        }),
        new Method({
            name: 'getPastLogs',
            call: 'platon_getLogs',
            params: 1,
            inputFormatter: [formatter.inputLogFormatter],
            outputFormatter: formatter.outputLogFormatter
        }),
        new Method({
            name: 'requestAccounts',
            call: 'platon_requestAccounts',
            params: 0
        //    outputFormatter: utils.toChecksumAddress
        }),
        new Method({
            name: 'getPendingTransactions',
            call: 'platon_pendingTransactions',
            params: 0,
            outputFormatter: formatter.outputTransactionFormatter
        }),

        // subscriptions
        new Subscriptions({
            name: 'subscribe',
            type: 'platon',
            subscriptions: {
                'newBlockHeaders': {
                    // TODO rename on RPC side?
                    subscriptionName: 'newHeads', // replace subscription with this name
                    params: 0,
                    outputFormatter: formatter.outputBlockFormatter
                },
                'pendingTransactions': {
                    subscriptionName: 'newPendingTransactions', // replace subscription with this name
                    params: 0
                },
                'logs': {
                    params: 1,
                    inputFormatter: [formatter.inputLogFormatter],
                    outputFormatter: formatter.outputLogFormatter,
                    // DUBLICATE, also in web3-eth-contract
                    subscriptionHandler: function (output) {
                        if(output.removed) {
                            this.emit('changed', output);
                        } else {
                            this.emit('data', output);
                        }

                        if (_.isFunction(this.callback)) {
                            this.callback(null, output, this);
                        }
                    }
                },
                'syncing': {
                    params: 0,
                    outputFormatter: formatter.outputSyncingFormatter,
                    subscriptionHandler: function (output) {
                        var _this = this;

                        // fire TRUE at start
                        if(this._isSyncing !== true) {
                            this._isSyncing = true;
                            this.emit('changed', _this._isSyncing);

                            if (_.isFunction(this.callback)) {
                                this.callback(null, _this._isSyncing, this);
                            }

                            setTimeout(function () {
                                _this.emit('data', output);

                                if (_.isFunction(_this.callback)) {
                                    _this.callback(null, output, _this);
                                }
                            }, 0);

                            // fire sync status
                        } else {
                            this.emit('data', output);
                            if (_.isFunction(_this.callback)) {
                                this.callback(null, output, this);
                            }

                            // wait for some time before fireing the FALSE
                            clearTimeout(this._isSyncingTimeout);
                            this._isSyncingTimeout = setTimeout(function () {
                                if(output.currentBlock > output.highestBlock - 200) {
                                    _this._isSyncing = false;
                                    _this.emit('changed', _this._isSyncing);

                                    if (_.isFunction(_this.callback)) {
                                        _this.callback(null, _this._isSyncing, _this);
                                    }
                                }
                            }, 500);
                        }
                    }
                }
            }
        })
    ];

    methods.forEach(function(method) {
        method.attachToObject(_this);
        method.setRequestManager(_this._requestManager, _this.accounts); // second param means is eth.accounts (necessary for wallet signing)
        method.defaultBlock = _this.defaultBlock;
        method.defaultAccount = _this.defaultAccount;
        method.transactionBlockTimeout = _this.transactionBlockTimeout;
        method.transactionConfirmationBlocks = _this.transactionConfirmationBlocks;
        method.transactionPollingTimeout = _this.transactionPollingTimeout;
        method.handleRevert = _this.handleRevert;
    });

};

core.addProviders(Eth);


module.exports = Eth;

