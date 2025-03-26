// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Modifier{

    address public owner;

    constructor(address initialOwner){
        owner = initialOwner;
    }

modifier onlyOwner(){
    require(msg.sender == owner, "Not owner");
    _;
}

function changeOwner(address newOwner) external onlyOwner{
    owner = newOwner;
}


}
