// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract Lock {
    uint public unlockTime;
    address payable public owner;

    address public  _address = 0x5B38Da6a701c568545dCfcB03FcB875f56beddC4;

    address public  _address2 = payable(_address);

    constructor(uint _unlockTime) payable {
        require(
            block.timestamp < _unlockTime,
            "Unlock time should be in the future"
        );
        unlockTime = _unlockTime;
        owner = payable(msg.sender);
    }
} 