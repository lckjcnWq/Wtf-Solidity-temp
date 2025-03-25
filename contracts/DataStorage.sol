// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DataStorage{

    uint[] public x = [1,2,3];

    function fCalldata(uint[] calldata _x) public pure returns(uint[] calldata){
            return  (_x);
    }

    function fMemory(uint[] memory _x) public pure returns(uint[] memory){
            return  (_x);
    }
    
    function fStorage() public{
        uint[] storage xStorage = x;
        xStorage[0] = 100;
    }

    function fMemory() public view{

        uint[] memory xMemory = x;
        xMemory[0] = 100;
        xMemory[1] = 200;
        uint[] memory xMemory2 = xMemory;
        xMemory2[2] = 300;
    }
    
}

contract Variables{
    uint public x = 1;
    uint public y ;
    string public z;

    function foo() external{
        x = 5;
        y = 2;
        z = "0xAA";
    }

    function bar() external pure returns(uint){
        uint xx = 1;
        uint yy = 2;
        uint zz = xx + yy;
        return zz;
    }

    function global() external view returns(address,uint,bytes memory){
        address sender = msg.sender;
        uint blockNumber = block.number;
        bytes memory data = msg.data;
        return (sender, blockNumber, data);
    }

function weiUnit() external pure returns(uint) {
        assert(1 wei == 1e0);
        assert(1 wei == 1);
        return 1 wei;
    }

    function gweiUnit() external pure returns(uint) {
        assert(1 gwei == 1e9);
        assert(1 gwei == 1000000000);
        return 1 gwei;
    }

    function etherUnit() external pure returns(uint) {
        assert(1 ether == 1e18);
        assert(1 ether == 1000000000000000000);
        return 1 ether;
    }
    
    function secondsUnit() external pure returns(uint) {
        assert(1 seconds == 1);
        return 1 seconds;
    }

    function minutesUnit() external pure returns(uint) {
        assert(1 minutes == 60);
        assert(1 minutes == 60 seconds);
        return 1 minutes;
    }

    function hoursUnit() external pure returns(uint) {
        assert(1 hours == 3600);
        assert(1 hours == 60 minutes);
        return 1 hours;
    }

    function daysUnit() external pure returns(uint) {
        assert(1 days == 86400);
        assert(1 days == 24 hours);
        return 1 days;
    }

    function weeksUnit() external pure returns(uint) {
        assert(1 weeks == 604800);
        assert(1 weeks == 7 days);
        return 1 weeks;
    }

}
