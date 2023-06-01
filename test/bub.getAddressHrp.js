var testMethod = require("./helpers/test.method.js");

var method = "getAddressHrp";
var methodCall = "bub_getAddressHrp";

var tests = [
    {
        result: "atp",
        formattedResult: "atp",
        call: methodCall
    }
];

testMethod.runTests("bub", method, tests);
