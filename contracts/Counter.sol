// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Counter {
    uint256 private _count;
    
    event CountChanged(uint256 newCount);
    
    function current() public view returns (uint256) {
        return _count;
    }
    
    function increment() public {
        _count += 1;
        emit CountChanged(_count);
    }
    
    function decrement() public {
        require(_count > 0, "Counter: cannot decrement below zero");
        _count -= 1;
        emit CountChanged(_count);
    }
} 