var arr = artifacts.require("./arr.sol");

contract('arr', function(accounts) {

    var addresses = [
        "0xa9508adb29e6099e9add901c67394e492c65263e",
        "0xfecfe7ab8fac5ddaebe5018f702d412a7f9ff246",
        "0x8d68583e625caae969fa9249502e105a21435ebf",
        "0xb4075d1a63b2a96e51885e690362e30cd103576f",
        "0xc4304dedfcf1eeddc3b655661eb4dd387e6d25b9",
        "0x0069d9d24e92c55fb1441ec355386f3b89d277ac",
        "0x7668a15242e802fa1b52e127781319f65335d845",
        "0x80c013d980ab049471c88e1603b8b4a60e03295c",
        "0x04c04cf0a874cf65a69d9b6e44c2c34ee9dd902d",
        "0xe5152f715434770176a462d8d6d5fccc79ecfdbe",
        "0xb1a2269c4f507761424a16b12e9522b2b9bd46b7",
        "0xc3dfa955c803a1559979cd2d3165f461dc9b5138",
        "0x2e262fc29051a4813a026db44dd7611a531710c3",
        "0x5f69981579776463aeda47d00489a083b8842fa2",
        "0x78a30c46deea2bd863683b1164a8deea7ebf5e3b",
        "0x00c50b6baaa2fafaeeec67a40863766b84e16953",
        "0x00280afba7e16b40e7efd581466308205d0c4aef",
        "0xd838b5135f8be33e75e7eea6f750e643c5c813b7",
        "0xaacb53d9ada6825be17020a445c6e9c21a22fe34",
        "0xde874113cde4156f962fc1c240ffbe5cfe60f943",
        "0xfd8cb3dd1ab79e070e3c083591b4cfad633d6dcf",
        "0xa2533b69af19ca0b35102ecf1da541883f04f893",
        "0xba772d3d99f45ce105459257c2f0d33bc17b04da",
        "0x1701aa0999b1ad52ef9ff3854a68f6044b1f3b63",
        "0x9d7f54503fcfa09ae6cb6ca832c45bf5be51152b"
    ]

    var hostsCount = 0;

    var gasReport = [];

   
    before('Init contract instances', function() {
        arr.deployed().then(function(deployed) {
            _arr = deployed;
        });
    });

    it('should return gameHosts count first', function(done) {
        _arr.getHostCount({
            from: accounts[0]
        }).then(function(result, data) {
            console.log('Result : ', result.toNumber());
            assert.equal(result.toNumber(), 0);
            hostsCount = result.toNumber();
            done();
        });
    });

    it("should add address in list", function(done) {
        var count = accounts.length;
        addresses.forEach(function(acc, index) {
            _arr.addHost(addresses[index], {
                from: accounts[0]
            }).then(function(result) {
                //console.log(result);
                count -= 1;
                if (count === 0) {
                    done();
                }
            });
        });
    });


    it('should return hosts count after insert ', function(done) {
        _arr.getHostCount({
            from: accounts[0]
        }).then(function(result, data) {
            console.log('Result : ', result.toNumber());
            assert.equal(result.toNumber(), addresses.length);
            hostsCount = result.toNumber();
            done();
        });
    });


    it('should delete addres from gameHosts Method 1  ', function(done) {
        _arr.deleteGameHost(1, {
            from: accounts[0]
        }).then(function(result, data) {
            console.log(result);
            gasReport.push( { "Sol Function" : "deleteGameHost", "GasUsed" : result.receipt.gasUsed, "tx": result  });
            hostsCount -= 1;
            done();
        });
    });

    it('should delete addres from gameHosts Method 2  ', function(done) {
        _arr.deleteGameHostv2(addresses[0], {
            from: accounts[0]
        }).then(function(result, data) {
            gasReport.push( { "Sol Function" : "deleteGameHostv2", "GasUsed" : result.receipt.gasUsed, "tx": result });
            hostsCount -= 1;
            done();
        });
    });

    it('should return correct count ', function(done) {
        _arr.getHostCount({
            from: accounts[0]
        }).then(function(result, data) {
            assert.equal(result.toNumber(), hostsCount);
            done();
        });
    });

    it('should delete addres from gameHosts Method 3  ', function(done) {
        _arr.deleteGameHostv3(addresses[1], {
            from: accounts[0]
        }).then(function(result, data) {
            gasReport.push( { "Sol Function" : "deleteGameHostv3", "GasUsed" : result.receipt.gasUsed, "tx": result });
            hostsCount -= 1;
            done();
        });
    });

    it('should delete again addres from gameHosts Method 3  ', function(done) {
        _arr.deleteGameHostv3(addresses[8], {
            from: accounts[0]
        }).then(function(result, data) {
            gasReport.push( { "Sol Function" : "deleteGameHostv3", "GasUsed" : result.receipt.gasUsed, "tx": result });
            hostsCount -= 1;
            done();
        });
    });

    it('should return correct count after delete ', function(done) {
        _arr.getHostCount({
            from: accounts[0]
        }).then(function(result, data) {
            console.log('Result : ', result.toNumber());
            assert.equal(result.toNumber(), hostsCount);
            done();
        });
    });

    it('should print final report', function(done){
        console.log('-----------------------');
        console.log(  JSON.stringify(gasReport) );
        done();
    });

});