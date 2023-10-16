var chai = require('chai');
var web3 = require('../index');
var testMethod = require('./helpers/test.method.js');

var method = 'getCompilers';


var tests = [{
    args: [],
    formattedArgs: [],
    result: ['solidity'],
    formattedResult: ['solidity'],
    call: 'bub_'+ method
},{
    args: [],
    formattedArgs: [],
    result: ['solidity'],
    formattedResult: ['solidity'],
    call: 'bub_'+ method
}];

testMethod.runTests('eth', method, tests);

