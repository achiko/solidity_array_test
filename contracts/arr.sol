pragma solidity ^ 0.4 .4;

contract arr {

	address[] public gameHosts; //gamhost addresses
	address[] public ngH;

	function arr() { }

	function addHost(address add)  returns (uint id) {
		gameHosts.push(add);
		id = 0;
	}

	function getHostCount() constant returns(uint length) {
		length = gameHosts.length;
		return length;
	}

	/**remove item from the array list by the index*/
	function deleteGameHost(uint p) {
		uint l = gameHosts.length;
		bool found = false;
		for (uint i = 0; i < l; i++) {
			if (found != true) {
				if (i == p) found = true;
			} else {
				gameHosts[i - 1] = gameHosts[i];
				gameHosts[i] = 0x0;
			}
		}
		if (found == true) gameHosts.length = gameHosts.length - 1;
	}

	function deleteGameHostv2(address _ad) {
       uint l = gameHosts.length;
       
       //bool found = false;
       for(uint i=0;i<l;i++){
           if(gameHosts[i]!=_ad)
            ngH.push(_ad);
       }
       gameHosts = ngH;
     }

	/**remove item from the array list by the index*/
	function deleteGameHostv3(address _ad) {
		uint l = gameHosts.length;
		bool found = false;
		for (uint i = 0; i < l; i++) {
			if (found != true) {
				if (gameHosts[i] == _ad) found = true;
			} else {
				gameHosts[i - 1] = gameHosts[i];
				gameHosts[i] = 0x0;
			}
		}
		if (found == true) gameHosts.length = gameHosts.length - 1;
	}

}