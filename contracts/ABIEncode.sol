// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract ABIEncode{

    uint x = 10;
    address addr = 0x1234567890123456789012345678901234567890;

    string name = "0xAA";
    uint[2] array = [5, 6]; 

    function encode() public view returns(bytes memory result){
        result = abi.encode(x,addr,name,array);
    }

    function encodePacked() public view returns(bytes memory result) {
        result = abi.encodePacked(x, addr, name, array);
    }

    function encodeWithSignature() public view returns(bytes memory result) {
        result = abi.encodeWithSignature("foo(uint256,address,string,uint256[2])", x, addr, name, array);
    }

    function encodeWithSelector() public view returns(bytes memory result) {
        result = abi.encodeWithSelector(bytes4(keccak256("foo(uint256,address,string,uint256[2])")), x, addr, name, array);
    }
    function decode(bytes memory data) public pure returns(uint dx, address daddr, string memory dname, uint[2] memory darray) {
        (dx, daddr, dname, darray) = abi.decode(data, (uint, address, string, uint[2]));
    }

}
