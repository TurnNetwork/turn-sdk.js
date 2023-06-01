var testMethod = require("./helpers/test.method.js");
var Bubble = require("../packages/web3-eth");

var bub = new Bubble();

var method = "getStorageAt";

var tests = [
    {
        args: ["0x4E65FDa2159562a496F9f3522f89122A3088497a", 2], // checksum address
        formattedArgs: [
            "0x4e65fda2159562a496f9f3522f89122a3088497a",
            "0x2",
            bub.defaultBlock
        ],
        result: "0x47d33b2",
        formattedResult: "0x47d33b2",
        call: "bub_" + method
    },
    {
        args: ["0x4E65FDa2159562a496F9f3522f89122A3088497a", 2, 0],
        formattedArgs: [
            "0x4e65fda2159562a496f9f3522f89122a3088497a",
            "0x2",
            "0x0"
        ],
        result:
            "0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855",
        formattedResult:
            "0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855",
        call: "bub_" + method
    },
    {
        args: ["0x47d33b27bb249a2dbab4c0612bf9caf4c1950855", 0xb, 0x0],
        formattedArgs: [
            "0x47d33b27bb249a2dbab4c0612bf9caf4c1950855",
            "0xb",
            "0x0"
        ],
        result:
            "0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855",
        formattedResult:
            "0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855",
        call: "bub_" + method
    },
    {
        args: ["0x47d33b27bb249a2dbab4c0612bf9caf4c1950855", 0xb, "latest"],
        formattedArgs: [
            "0x47d33b27bb249a2dbab4c0612bf9caf4c1950855",
            "0xb",
            "latest"
        ],
        result:
            "0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855",
        formattedResult:
            "0x47d33b27bb249a2dbab4c0612bf9caf4747d33b27bb249a2dbab4c0612bf9cafd33b27bb249a2dbab4c0612bf9caf4c1950855",
        call: "bub_" + method
    }
];

testMethod.runTests("bub", method, tests);
